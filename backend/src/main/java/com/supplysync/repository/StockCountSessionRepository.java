package com.supplysync.repository;

import com.supplysync.entity.StockCountSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockCountSessionRepository extends JpaRepository<StockCountSession, Long> {
    Optional<StockCountSession> findByStatus(StockCountSession.SessionStatus status);
}
