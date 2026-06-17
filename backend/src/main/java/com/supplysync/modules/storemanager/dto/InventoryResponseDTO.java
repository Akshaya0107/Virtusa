package com.supplysync.modules.storemanager.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class InventoryResponseDTO {
    private Long id;
    private Long productId;
    private String productName;
    private String productSku;
    private int quantity;
    private int minThreshold;
    private String location;
    private String status;
    private String category;
    private LocalDateTime updatedAt;
}
