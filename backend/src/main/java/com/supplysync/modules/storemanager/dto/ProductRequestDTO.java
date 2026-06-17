package com.supplysync.modules.storemanager.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequestDTO {
    private String sku;
    private String name;
    private String description;
    private BigDecimal price;
    private Long categoryId;
}
