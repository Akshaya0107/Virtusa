package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "po_approvals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class POApproval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "purchase_order_id")
    private PurchaseOrder purchaseOrder;

    @ManyToOne
    @JoinColumn(name = "approved_by")
    private User reviewer;

    private String status; // APPROVED, REJECTED
    private String comments;

    @CreationTimestamp
    private LocalDateTime reviewedAt;
}
