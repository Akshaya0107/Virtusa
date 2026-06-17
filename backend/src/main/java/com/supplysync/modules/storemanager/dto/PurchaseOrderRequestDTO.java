package com.supplysync.modules.storemanager.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PurchaseOrderRequestDTO {
    private Long supplier_id;
    private LocalDateTime expectedDeliveryDate;
    private List<OrderItemDTO> items;

    @Data
    public static class OrderItemDTO {
        private Long product_id;
        private int quantity;
        private BigDecimal unitPrice;
    }
}
