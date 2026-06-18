package com.supplysync.repository;

import com.supplysync.entity.ETAConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ETAConfirmationRepository extends JpaRepository<ETAConfirmation, Long> {
    List<ETAConfirmation> findByPurchaseOrder_Supplier_Id(Long supplierId);
    List<ETAConfirmation> findByPurchaseOrderSupplierId(Long supplierId);
}
