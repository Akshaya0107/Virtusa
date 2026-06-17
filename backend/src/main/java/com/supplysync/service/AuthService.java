package com.supplysync.service;

import com.supplysync.dto.AuthResponseDto;
import com.supplysync.dto.LoginRequestDto;
import com.supplysync.dto.SignupRequestDto;
import com.supplysync.entity.Role;
import com.supplysync.entity.User;
import com.supplysync.repository.RoleRepository;
import com.supplysync.repository.UserRepository;
import com.supplysync.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public AuthResponseDto authenticateUser(LoginRequestDto loginRequest) {
        System.out.println("LOGIN ATTEMPT: " + loginRequest.getEmail());
        System.out.println("RAW PWD: " + loginRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).get();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return AuthResponseDto.builder()
                .token(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .roles(roles)
                .build();
    }

    public void registerUser(SignupRequestDto signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        User user = User.builder()
                .fullName(signUpRequest.getFullName())
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .phone(signUpRequest.getPhone())
                .build();

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(Role.RoleType.ROLE_STORE_MANAGER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(Role.RoleType.ROLE_FINANCE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "warehouse":
                        Role whRole = roleRepository.findByName(Role.RoleType.ROLE_WAREHOUSE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(whRole);
                        break;
                    case "supplier":
                        Role supRole = roleRepository.findByName(Role.RoleType.ROLE_SUPPLIER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(supRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(Role.RoleType.ROLE_STORE_MANAGER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
    }
}
