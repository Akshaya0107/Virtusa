package com.supplysync.modules.finance.service;

import com.supplysync.modules.finance.dto.FinanceDashboardDTO;
import com.supplysync.modules.finance.dto.ApprovalRequestDTO;
import com.supplysync.entity.*;
import java.util.List;
import java.util.Map;
import java.math.BigDecimal;

public interface FinanceService {
    FinanceDashboardDTO getDashboardStats();
    List<PurchaseOrder> getPendingPurchaseOrders();
    List<PurchaseOrder> getAllPurchaseOrders();
    PurchaseOrder approveOrRejectPO(Long poId, ApprovalRequestDTO request, String reviewerEmail);
    List<POApproval> getApprovalHistory(Long poId);
    
    byte[] generateReport(String type) throws Exception;
    List<FinancialReport> getGeneratedReports();

    // New methods
    List<CostAnalysis> getCostAnalysis();
    Map<String, BigDecimal> getCategorySpending();
    List<SupplierCost> getSupplierCosts();
    List<SupplierPayment> getSupplierPayments();
    Budget getBudget();
    List<AuditLog> getAuditLogs();
    List<Notification> getNotifications();
}
