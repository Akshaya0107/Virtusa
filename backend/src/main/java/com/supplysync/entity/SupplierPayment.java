package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupplierPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private LocalDateTime paymentDate;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String transactionReference;

    public enum PaymentStatus {
        PENDING, PAID, DELAYED, CANCELLED
    }
}
