package com.supplysync.dto;

import lombok.Data;

@Data
public class ContactRequestDto {
    private String name;
    private String email;
    private String subject;
    private String message;
}
