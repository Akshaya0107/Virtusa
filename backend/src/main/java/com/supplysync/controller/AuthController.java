package com.supplysync.controller;

import com.supplysync.dto.AuthResponseDto;
import com.supplysync.dto.LoginRequestDto;
import com.supplysync.dto.SignupRequestDto;
import com.supplysync.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Endpoints for user registration and login")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Authenticate user and return JWT")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequest) {
        AuthResponseDto response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequestDto signUpRequest) {
        authService.registerUser(signUpRequest);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Initiate password reset")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        // Implementation for forgot password (mock)
        return ResponseEntity.ok("Password reset link sent to your email.");
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset user password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        // Implementation for reset password (mock)
        return ResponseEntity.ok("Password updated successfully.");
    }

    @GetMapping("/profile")
    @Operation(summary = "Get current user profile")
    public ResponseEntity<?> getUserProfile() {
        // Implementation for profile
        return ResponseEntity.ok("Profile data");
    }
}
