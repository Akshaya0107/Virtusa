package com.supplysync.modules.warehouse.dto;

import com.supplysync.entity.StockReceipt.ReceiptCondition;
import lombok.Data;

@Data
public class StockReceiptDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Long supplierId;
    private String supplierName;
    private int quantityReceived;
    private String batchNumber;
    private ReceiptCondition conditionStatus;
    private String qrCode;
    private String receivedDate;
}
