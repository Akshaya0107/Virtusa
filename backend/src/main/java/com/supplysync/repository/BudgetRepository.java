package com.supplysync.repository;

import com.supplysync.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.Month;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    Optional<Budget> findByBudgetYearAndBudgetMonth(int year, Month month);
}
