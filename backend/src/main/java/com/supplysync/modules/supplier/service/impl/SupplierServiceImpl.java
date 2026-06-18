package com.supplysync.modules.supplier.service.impl;

import com.supplysync.entity.PurchaseOrder;
import com.supplysync.entity.ETAConfirmation;
import com.supplysync.modules.supplier.dto.SupplierDashboardDTO;
import com.supplysync.modules.supplier.service.SupplierService;
import com.supplysync.repository.PurchaseOrderRepository;
import com.supplysync.repository.ETAConfirmationRepository;
import com.supplysync.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired private PurchaseOrderRepository poRepository;
    @Autowired private ETAConfirmationRepository etaRepository;
    @Autowired private NotificationRepository notificationRepository;

    @Override
    public SupplierDashboardDTO getDashboardStats(Long supplierId) {
        long assigned = poRepository.countBySupplierId(supplierId);
        long pending = poRepository.countBySupplierIdAndStatus(supplierId, PurchaseOrder.OrderStatus.PENDING);
        long delivered = poRepository.countBySupplierIdAndStatus(supplierId, PurchaseOrder.OrderStatus.DELIVERED);
        long upcoming = poRepository.countBySupplierIdAndStatus(supplierId, PurchaseOrder.OrderStatus.CONFIRMED);

        return SupplierDashboardDTO.builder()
                .assignedOrders(assigned)
                .pendingDeliveries(pending)
                .completedDeliveries(delivered)
                .upcomingDeliveries(upcoming)
                .notifications(notificationRepository.findTop5ByOrderByCreatedAtDesc())
                .build();
    }

    @Override
    public List<PurchaseOrder> getAssignedOrders(Long supplierId) {
        return poRepository.findBySupplierId(supplierId);
    }

    @Override
    @Transactional
    public PurchaseOrder updateOrderStatus(Long orderId, String status) {
        PurchaseOrder po = poRepository.findById(orderId).orElseThrow();
        po.setStatus(PurchaseOrder.OrderStatus.valueOf(status));
        return poRepository.save(po);
    }

    @Override
    @Transactional
    public ETAConfirmation confirmETA(ETAConfirmation eta) {
        // Update PO status to CONFIRMED when ETA is set
        PurchaseOrder po = poRepository.findById(eta.getPurchaseOrder().getId()).orElseThrow();
        po.setStatus(PurchaseOrder.OrderStatus.CONFIRMED);
        poRepository.save(po);
        
        return etaRepository.save(eta);
    }

    @Override
    public List<ETAConfirmation> getDeliveryHistory(Long supplierId) {
        return etaRepository.findByPurchaseOrderSupplierId(supplierId);
    }
}
