package com.supplysync.repository;

import com.supplysync.entity.CostAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CostAnalysisRepository extends JpaRepository<CostAnalysis, Long> {
}
