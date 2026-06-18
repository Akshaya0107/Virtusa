package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "dispatches")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dispatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dispatchNumber; // Unique tracking ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private int quantity;
    private String destination;

    @Enumerated(EnumType.STRING)
    private DispatchStatus status; // PACKED, IN_TRANSIT, DELIVERED, DELAYED

    @CreationTimestamp
    private LocalDateTime dispatchDate;

    public enum DispatchStatus {
        PACKED, IN_TRANSIT, DELIVERED, DELAYED
    }
}
