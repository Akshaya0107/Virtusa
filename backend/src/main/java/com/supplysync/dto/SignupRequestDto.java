package com.supplysync.dto;

import lombok.Data;
import java.util.Set;

@Data
public class SignupRequestDto {
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private Set<String> roles;
}
