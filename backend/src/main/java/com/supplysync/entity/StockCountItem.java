package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stock_count_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StockCountItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private StockCountSession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int systemQuantity;
    private int physicalQuantity;
    private int difference;

    @Enumerated(EnumType.STRING)
    private VerificationStatus status; // CORRECT, MISMATCH, MISSING

    public enum VerificationStatus {
        CORRECT, MISMATCH, MISSING
    }
}
