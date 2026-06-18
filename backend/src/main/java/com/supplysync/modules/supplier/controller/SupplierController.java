package com.supplysync.modules.supplier.controller;

import com.supplysync.entity.PurchaseOrder;
import com.supplysync.entity.ETAConfirmation;
import com.supplysync.modules.supplier.dto.SupplierDashboardDTO;
import com.supplysync.modules.supplier.service.SupplierService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier")
@Tag(name = "Supplier", description = "Supplier module operations")
@PreAuthorize("hasRole('SUPPLIER')")
public class SupplierController {

    @Autowired private SupplierService supplierService;

    @GetMapping("/dashboard/{supplierId}")
    @Operation(summary = "Get supplier dashboard stats")
    public ResponseEntity<SupplierDashboardDTO> getDashboard(@PathVariable Long supplierId) {
        return ResponseEntity.ok(supplierService.getDashboardStats(supplierId));
    }

    @GetMapping("/purchase-orders/{supplierId}")
    @Operation(summary = "Get assigned purchase orders")
    public ResponseEntity<List<PurchaseOrder>> getOrders(@PathVariable Long supplierId) {
        return ResponseEntity.ok(supplierService.getAssignedOrders(supplierId));
    }

    @PutMapping("/purchase-orders/{orderId}/status")
    @Operation(summary = "Update purchase order status")
    public ResponseEntity<PurchaseOrder> updateStatus(@PathVariable Long orderId, @RequestParam String status) {
        return ResponseEntity.ok(supplierService.updateOrderStatus(orderId, status));
    }

    @PostMapping("/eta")
    @Operation(summary = "Confirm delivery ETA")
    public ResponseEntity<ETAConfirmation> confirmETA(@RequestBody ETAConfirmation eta) {
        return ResponseEntity.ok(supplierService.confirmETA(eta));
    }

    @GetMapping("/delivery-history/{supplierId}")
    @Operation(summary = "Get delivery history")
    public ResponseEntity<List<ETAConfirmation>> getHistory(@PathVariable Long supplierId) {
        return ResponseEntity.ok(supplierService.getDeliveryHistory(supplierId));
    }
}
