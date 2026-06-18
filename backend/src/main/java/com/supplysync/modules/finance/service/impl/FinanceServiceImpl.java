package com.supplysync.modules.finance.service.impl;

import com.supplysync.entity.*;
import com.supplysync.modules.finance.dto.ApprovalRequestDTO;
import com.supplysync.modules.finance.dto.FinanceDashboardDTO;
import com.supplysync.modules.finance.service.FinanceService;
import com.supplysync.modules.storemanager.service.JasperReportService;
import com.supplysync.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class FinanceServiceImpl implements FinanceService {

    @Autowired private PurchaseOrderRepository poRepository;
    @Autowired private POApprovalRepository approvalRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private BudgetRepository budgetRepository;
    @Autowired private NotificationRepository notificationRepository;
    @Autowired private SupplierCostRepository supplierCostRepository;
    @Autowired private SupplierPaymentRepository supplierPaymentRepository;
    @Autowired private AuditLogRepository auditLogRepository;
    @Autowired private CostAnalysisRepository costAnalysisRepository;
    @Autowired private ExpenseRecordRepository expenseRecordRepository;

    @Override
    public FinanceDashboardDTO getDashboardStats() {
        long pending = poRepository.countByStatus(PurchaseOrder.OrderStatus.PENDING);
        long approved = poRepository.countByStatus(PurchaseOrder.OrderStatus.APPROVED);
        
        BigDecimal totalCost = poRepository.findAll().stream()
                .filter(po -> po.getStatus() == PurchaseOrder.OrderStatus.APPROVED || po.getStatus() == PurchaseOrder.OrderStatus.DELIVERED)
                .map(PurchaseOrder::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        LocalDateTime now = LocalDateTime.now();
        BigDecimal monthlySpend = poRepository.findAll().stream()
                .filter(po -> po.getOrderDate().getMonth() == now.getMonth() && po.getOrderDate().getYear() == now.getYear())
                .filter(po -> po.getStatus() != PurchaseOrder.OrderStatus.CANCELLED && po.getStatus() != PurchaseOrder.OrderStatus.REJECTED)
                .map(PurchaseOrder::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return FinanceDashboardDTO.builder()
                .pendingApprovals(pending)
                .approvedPurchaseOrders(approved)
                .totalProcurementCost(totalCost)
                .monthlySpend(monthlySpend)
                .build();
    }

    @Override
    public List<PurchaseOrder> getPendingPurchaseOrders() {
        return poRepository.findByStatus(PurchaseOrder.OrderStatus.PENDING);
    }

    @Override
    public List<PurchaseOrder> getAllPurchaseOrders() {
        return poRepository.findAll();
    }

    @Override
    @Transactional
    public PurchaseOrder approveOrRejectPO(Long poId, ApprovalRequestDTO request, String reviewerEmail) {
        PurchaseOrder po = poRepository.findById(poId).orElseThrow(() -> new RuntimeException("PO not found"));
        User reviewer = userRepository.findByEmail(reviewerEmail).orElseThrow(() -> new RuntimeException("User not found"));

        PurchaseOrder.OrderStatus oldStatus = po.getStatus();
        PurchaseOrder.OrderStatus newStatus = PurchaseOrder.OrderStatus.valueOf(request.getStatus());
        
        po.setStatus(newStatus);
        poRepository.save(po);

        POApproval approval = POApproval.builder()
                .purchaseOrder(po)
                .reviewer(reviewer)
                .status(request.getStatus())
                .comments(request.getComments())
                .build();
        approvalRepository.save(approval);

        // Notify Store Manager
        Notification notification = Notification.builder()
                .user(po.getCreatedBy())
                .title("Purchase Order " + request.getStatus())
                .message("Your Purchase Order #" + po.getOrderNumber() + " has been " + request.getStatus().toLowerCase())
                .type("PO_STATUS")
                .isRead(false)
                .build();
        notificationRepository.save(notification);

        return po;
    }

    @Autowired private FinancialReportRepository reportRepository;
    @Autowired private JasperReportService jasperReportService;

    @Override
    public List<POApproval> getApprovalHistory(Long poId) {
        return approvalRepository.findByPurchaseOrderIdOrderByReviewedAtDesc(poId);
    }

    @Override
    public byte[] generateReport(String type) throws Exception {
        List<?> data;
        String templateName;
        Map<String, Object> params = new java.util.HashMap<>();
        
        switch (type.toUpperCase()) {
            case "PROCUREMENT":
                data = poRepository.findAll();
                templateName = "procurement_report";
                break;
            case "MONTHLY_EXPENSE":
                data = poRepository.findAll(); // Simplify for demo
                templateName = "expense_report";
                break;
            case "SUPPLIER_COST":
                data = poRepository.findAll();
                templateName = "supplier_cost_report";
                break;
            default:
                throw new RuntimeException("Invalid report type");
        }

        byte[] reportContent = jasperReportService.generateReport(templateName, data, params);
        
        FinancialReport report = FinancialReport.builder()
                .reportName(type + " Report - " + LocalDateTime.now())
                .reportType(type)
                .status("COMPLETED")
                .build();
        reportRepository.save(report);

        return reportContent;
    }

    @Override
    public List<FinancialReport> getGeneratedReports() {
        return reportRepository.findAll();
    }

    @Override
    public List<CostAnalysis> getCostAnalysis() {
        return costAnalysisRepository.findAll();
    }

    @Override
    public Map<String, BigDecimal> getCategorySpending() {
        List<ExpenseRecord> expenses = expenseRecordRepository.findAll();
        Map<String, BigDecimal> categorySpending = new HashMap<>();
        for (ExpenseRecord expense : expenses) {
            categorySpending.merge(expense.getCategory(), expense.getAmount(), BigDecimal::add);
        }
        return categorySpending;
    }

    @Override
    public List<SupplierCost> getSupplierCosts() {
        return supplierCostRepository.findAll();
    }

    @Override
    public List<SupplierPayment> getSupplierPayments() {
        return supplierPaymentRepository.findAll();
    }

    @Override
    public Budget getBudget() {
        return budgetRepository.findAll().stream().findFirst().orElse(null);
    }

    @Override
    public List<AuditLog> getAuditLogs() {
        return auditLogRepository.findAll();
    }

    @Override
    public List<Notification> getNotifications() {
        return notificationRepository.findAll();
    }
}
