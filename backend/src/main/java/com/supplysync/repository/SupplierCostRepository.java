package com.supplysync.repository;

import com.supplysync.entity.SupplierCost;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SupplierCostRepository extends JpaRepository<SupplierCost, Long> {
    List<SupplierCost> findBySupplierId(Long supplierId);
    List<SupplierCost> findByProductId(Long productId);
}
