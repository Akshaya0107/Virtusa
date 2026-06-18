package com.supplysync.modules.finance.dto;

import lombok.Data;

@Data
public class ApprovalRequestDTO {
    private String status; // APPROVED, REJECTED
    private String comments;
}
