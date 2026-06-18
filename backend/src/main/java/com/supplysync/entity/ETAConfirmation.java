package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "eta_confirmations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ETAConfirmation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "purchase_order_id")
    private PurchaseOrder purchaseOrder;

    private LocalDateTime shipmentDate;
    private LocalDateTime expectedDeliveryDate;
    private String vehicleNumber;
    private String deliveryNotes;

    @Enumerated(EnumType.STRING)
    private ETAStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public enum ETAStatus {
        ON_TIME, DELAYED, PARTIAL_DELIVERY
    }
}
