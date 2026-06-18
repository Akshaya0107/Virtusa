package com.supplysync.modules.finance.controller;

import com.supplysync.entity.*;
import com.supplysync.modules.finance.dto.ApprovalRequestDTO;
import com.supplysync.modules.finance.dto.FinanceDashboardDTO;
import com.supplysync.modules.finance.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/finance")
@PreAuthorize("hasRole('FINANCE_ADMIN')")
public class FinanceController {

    @Autowired private FinanceService financeService;

    @GetMapping("/dashboard")
    public ResponseEntity<FinanceDashboardDTO> getDashboardStats() {
        return ResponseEntity.ok(financeService.getDashboardStats());
    }

    @GetMapping("/purchase-orders")
    public ResponseEntity<List<PurchaseOrder>> getAllPurchaseOrders() {
        return ResponseEntity.ok(financeService.getAllPurchaseOrders());
    }

    @GetMapping("/purchase-orders/pending")
    public ResponseEntity<List<PurchaseOrder>> getPendingPurchaseOrders() {
        return ResponseEntity.ok(financeService.getPendingPurchaseOrders());
    }

    @PutMapping("/purchase-orders/{id}/approve")
    public ResponseEntity<PurchaseOrder> approvePO(
            @PathVariable Long id, 
            @RequestBody ApprovalRequestDTO request,
            Authentication authentication) {
        request.setStatus("APPROVED");
        return ResponseEntity.ok(financeService.approveOrRejectPO(id, request, authentication.getName()));
    }

    @PutMapping("/purchase-orders/{id}/reject")
    public ResponseEntity<PurchaseOrder> rejectPO(
            @PathVariable Long id, 
            @RequestBody ApprovalRequestDTO request,
            Authentication authentication) {
        request.setStatus("REJECTED");
        return ResponseEntity.ok(financeService.approveOrRejectPO(id, request, authentication.getName()));
    }

    @GetMapping("/purchase-orders/{id}/history")
    public ResponseEntity<List<POApproval>> getApprovalHistory(@PathVariable Long id) {
        return ResponseEntity.ok(financeService.getApprovalHistory(id));
    }

    @PostMapping("/reports/{type}")
    public ResponseEntity<byte[]> generateReport(@PathVariable String type) throws Exception {
        byte[] report = financeService.generateReport(type);
        return ResponseEntity.ok()
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=" + type + "_report.pdf")
                .body(report);
    }

    @GetMapping("/reports")
    public ResponseEntity<List<FinancialReport>> getReports() {
        return ResponseEntity.ok(financeService.getGeneratedReports());
    }

    @GetMapping("/cost-analysis")
    public ResponseEntity<List<CostAnalysis>> getCostAnalysis() {
        return ResponseEntity.ok(financeService.getCostAnalysis());
    }

    @GetMapping("/cost-analysis/categories")
    public ResponseEntity<Map<String, BigDecimal>> getCategorySpending() {
        return ResponseEntity.ok(financeService.getCategorySpending());
    }

    @GetMapping("/suppliers/costs")
    public ResponseEntity<List<SupplierCost>> getSupplierCosts() {
        return ResponseEntity.ok(financeService.getSupplierCosts());
    }

    @GetMapping("/suppliers/payments")
    public ResponseEntity<List<SupplierPayment>> getSupplierPayments() {
        return ResponseEntity.ok(financeService.getSupplierPayments());
    }

    @GetMapping("/budget")
    public ResponseEntity<Budget> getBudget() {
        return ResponseEntity.ok(financeService.getBudget());
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(financeService.getAuditLogs());
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotifications() {
        return ResponseEntity.ok(financeService.getNotifications());
    }
}
