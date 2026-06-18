package com.supplysync.repository;

import com.supplysync.entity.FinancialReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FinancialReportRepository extends JpaRepository<FinancialReport, Long> {
    List<FinancialReport> findByGeneratedByEmail(String email);
}
