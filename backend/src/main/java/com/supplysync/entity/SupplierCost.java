package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_costs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierCost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private BigDecimal unitCost;
    private BigDecimal previousUnitCost;
    private BigDecimal totalPurchaseCost;
    private LocalDateTime lastTransactionDate;
    private String currency; // Should be INR based on requirements

    @CreationTimestamp
    private LocalDateTime effectiveDate;
}
