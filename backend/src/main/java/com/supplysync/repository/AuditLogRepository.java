package com.supplysync.repository;

import com.supplysync.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findTop20ByOrderByCreatedAtDesc();
}
