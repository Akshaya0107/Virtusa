package com.supplysync.modules.storemanager.controller;

import com.supplysync.modules.storemanager.dto.PurchaseOrderRequestDTO;
import com.supplysync.modules.storemanager.dto.PurchaseOrderResponseDTO;
import com.supplysync.modules.storemanager.service.PurchaseOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase-orders")
@Tag(name = "Purchase Orders", description = "Operations for supplier orders")
public class PurchaseOrderController {

    @Autowired private PurchaseOrderService purchaseOrderService;

    @PostMapping
    @Operation(summary = "Create a new purchase order")
    public ResponseEntity<PurchaseOrderResponseDTO> createOrder(@Valid @RequestBody PurchaseOrderRequestDTO request) {
        return ResponseEntity.ok(purchaseOrderService.createOrder(request));
    }

    @GetMapping
    @Operation(summary = "Get all purchase orders")
    public ResponseEntity<List<PurchaseOrderResponseDTO>> getAll() {
        return ResponseEntity.ok(purchaseOrderService.getAllOrders());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order details by ID")
    public ResponseEntity<PurchaseOrderResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(purchaseOrderService.getOrderById(id));
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update order status")
    public ResponseEntity<PurchaseOrderResponseDTO> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(purchaseOrderService.updateStatus(id, status));
    }
}
