package com.supplysync.repository;

import com.supplysync.entity.SupplierPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SupplierPaymentRepository extends JpaRepository<SupplierPayment, Long> {
    List<SupplierPayment> findBySupplierId(Long supplierId);
}
