package com.supplysync.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    @Builder.Default
    private String type = "Bearer";
    private Long id;
    private String email;
    private String fullName;
    private List<String> roles;
}
