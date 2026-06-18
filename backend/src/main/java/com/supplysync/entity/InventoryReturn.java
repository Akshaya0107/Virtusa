package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventory_returns")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryReturn {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String returnNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int quantity;
    
    @Enumerated(EnumType.STRING)
    private ReturnReason reason; // DAMAGED, WRONG_PRODUCT, EXPIRED, CUSTOMER_RETURN
    
    @Enumerated(EnumType.STRING)
    private ReturnCondition condition; // GOOD, SCRAP, REPAIRABLE

    @Enumerated(EnumType.STRING)
    private ReturnStatus status; // PENDING, ACCEPTED, REJECTED

    @CreationTimestamp
    private LocalDateTime returnDate;

    public enum ReturnReason {
        DAMAGED, WRONG_PRODUCT, EXPIRED, CUSTOMER_RETURN
    }

    public enum ReturnCondition {
        GOOD, SCRAP, REPAIRABLE
    }

    public enum ReturnStatus {
        PENDING, ACCEPTED, REJECTED
    }
}
