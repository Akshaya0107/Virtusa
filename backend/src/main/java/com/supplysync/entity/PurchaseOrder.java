package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "purchase_orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String orderNumber;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private OrderStatus status = OrderStatus.PENDING;

    private BigDecimal totalAmount;

    @CreationTimestamp
    private LocalDateTime orderDate;

    private LocalDateTime expectedDeliveryDate;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    private String deliveryAddress;
    private String contactPerson;
    private String specialInstructions;
    private String deliveryDeadline;

    @OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<PurchaseOrderItem> items = new ArrayList<>();

    public enum OrderStatus {
        PENDING, CONFIRMED, SHIPPED, IN_TRANSIT, DELIVERED, CANCELLED
    }
}
