package com.supplysync.repository;

import com.supplysync.entity.StockHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StockHistoryRepository extends JpaRepository<StockHistory, Long> {
    List<StockHistory> findByProductIdOrderByCreatedAtDesc(Long productId);
}
