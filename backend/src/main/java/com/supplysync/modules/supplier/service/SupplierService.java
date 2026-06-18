package com.supplysync.modules.supplier.service;

import com.supplysync.entity.PurchaseOrder;
import com.supplysync.entity.ETAConfirmation;
import com.supplysync.modules.supplier.dto.SupplierDashboardDTO;
import java.util.List;

public interface SupplierService {
    SupplierDashboardDTO getDashboardStats(Long supplierId);
    List<PurchaseOrder> getAssignedOrders(Long supplierId);
    PurchaseOrder updateOrderStatus(Long orderId, String status);
    ETAConfirmation confirmETA(ETAConfirmation eta);
    List<ETAConfirmation> getDeliveryHistory(Long supplierId);
}
