package com.supplysync.repository;

import com.supplysync.entity.ExpenseRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRecordRepository extends JpaRepository<ExpenseRecord, Long> {
}
