package com.supplysync.dto;

import lombok.Data;

@Data
public class InventoryRequestDTO {
    private Long productId;
    private int quantity;
    private int minThreshold;
    private String location;
}
