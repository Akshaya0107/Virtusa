package com.supplysync.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "financial_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinancialReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reportName;
    private String reportType; // e.g., PROCUREMENT, MONTHLY_EXPENSE
    private String fileUri;
    
    @ManyToOne
    @JoinColumn(name = "generated_by")
    private User generatedBy;

    @CreationTimestamp
    private LocalDateTime generatedAt;
    
    private String status; // COMPLETED, FAILED
}
