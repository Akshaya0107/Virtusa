package com.supplysync.repository;

import com.supplysync.entity.Dispatch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DispatchRepository extends JpaRepository<Dispatch, Long> {
    List<Dispatch> findByDispatchDateBetween(LocalDateTime start, LocalDateTime end);
}
