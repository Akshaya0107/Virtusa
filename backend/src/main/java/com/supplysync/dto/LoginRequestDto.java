package com.supplysync.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String email;
    private String password;
}
