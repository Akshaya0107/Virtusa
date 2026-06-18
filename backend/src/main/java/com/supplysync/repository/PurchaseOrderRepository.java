package com.supplysync.repository;

import com.supplysync.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
    List<PurchaseOrder> findByStatus(PurchaseOrder.OrderStatus status);
    List<PurchaseOrder> findByOrderByOrderDateDesc();
    @Query("SELECT COUNT(po) FROM PurchaseOrder po WHERE po.status = 'PENDING'")
    long countPendingOrders();

    List<PurchaseOrder> findBySupplierId(Long supplierId);
    long countBySupplierId(Long supplierId);
    long countBySupplierIdAndStatus(Long supplierId, PurchaseOrder.OrderStatus status);
    long countByStatus(PurchaseOrder.OrderStatus status);
}
