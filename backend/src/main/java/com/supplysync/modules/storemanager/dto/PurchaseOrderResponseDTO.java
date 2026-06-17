package com.supplysync.modules.storemanager.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PurchaseOrderResponseDTO {
    private Long id;
    private String orderNumber;
    private Long supplierId;
    private String supplierName;
    private String status;
    private BigDecimal totalAmount;
    private LocalDateTime orderDate;
    private LocalDateTime expectedDeliveryDate;
    private List<OrderItemResponseDTO> items;

    @Data
    public static class OrderItemResponseDTO {
        private Long product_id;
        private String productName;
        private int quantity;
        private BigDecimal unitPrice;
    }
}
