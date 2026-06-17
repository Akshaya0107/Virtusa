package com.supplysync.repository;

import com.supplysync.entity.SalesRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface SalesRecordRepository extends JpaRepository<SalesRecord, Long> {
    List<SalesRecord> findBySaleDateBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(s.totalPrice) FROM SalesRecord s WHERE s.saleDate BETWEEN :start AND :end")
    BigDecimal getTotalSalesBetween(LocalDateTime start, LocalDateTime end);
    @Query("SELECT SUM(s.totalPrice) FROM SalesRecord s")
    BigDecimal calculateTotalRevenue();
    @Query("SELECT CAST(s.saleDate AS date) as day, SUM(s.totalPrice) as amount FROM SalesRecord s GROUP BY day ORDER BY day DESC")
    List<Object[]> getDailySales();
}
