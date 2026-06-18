package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "cost_analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CostAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String analysisPeriod; // e.g., "JUNE 2026"
    
    private BigDecimal totalProcurementCost;
    private BigDecimal averageProductCost;
    private BigDecimal budgetUsagePercentage;
    private BigDecimal costSavings;

    private LocalDateTime generatedAt;
}
