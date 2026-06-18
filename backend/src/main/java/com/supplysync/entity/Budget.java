package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.Month;

@Entity
@Table(name = "budgets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int budgetYear;
    
    @Enumerated(EnumType.STRING)
    private Month budgetMonth;

    private BigDecimal allocatedAmount;
    
    // Frontend aliases/convenience fields
    private BigDecimal monthlyBudget;
    private BigDecimal usedBudget;
    private BigDecimal remainingBudget;
    private String fiscalYear;
    private String month;

    @Builder.Default
    private BigDecimal usedAmount = BigDecimal.ZERO;
    
    @Builder.Default
    private BigDecimal thresholdPercentage = new BigDecimal("80.00");
}
