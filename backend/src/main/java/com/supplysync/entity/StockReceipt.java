package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "stock_receipts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockReceipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    private int quantityReceived;
    private String batchNumber;
    
    @Enumerated(EnumType.STRING)
    private ReceiptCondition conditionStatus; // GOOD, DAMAGED, PENDING_INSPECTION

    private String qrCode;

    @CreationTimestamp
    private LocalDateTime receivedDate;

    public enum ReceiptCondition {
        GOOD, DAMAGED, PENDING_INSPECTION
    }
}
