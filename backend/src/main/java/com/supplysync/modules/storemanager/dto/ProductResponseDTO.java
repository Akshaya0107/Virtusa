package com.supplysync.modules.storemanager.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductResponseDTO {
    private Long id;
    private String sku;
    private String name;
    private String description;
    private BigDecimal price;
    private String categoryName;
    private int currentStock;
    private String qrCode;
    private LocalDateTime createdAt;
}
