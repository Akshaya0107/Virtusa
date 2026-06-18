package com.supplysync.modules.warehouse.controller;

import com.supplysync.modules.warehouse.dto.StockReceiptDTO;
import com.supplysync.modules.warehouse.dto.WarehouseDashboardDTO;
import com.supplysync.modules.warehouse.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/warehouse")
public class WarehouseController {

    @Autowired private WarehouseService warehouseService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('WAREHOUSE')")
    public ResponseEntity<WarehouseDashboardDTO> getDashboardStats() {
        return ResponseEntity.ok(warehouseService.getDashboardStats());
    }

    @PostMapping("/receipts")
    @PreAuthorize("hasRole('WAREHOUSE')")
    public ResponseEntity<StockReceiptDTO> receiveStock(@RequestBody StockReceiptDTO receiptDTO) {
        return ResponseEntity.ok(warehouseService.receiveStock(receiptDTO));
    }

    @GetMapping("/receipts")
    @PreAuthorize("hasRole('WAREHOUSE')")
    public ResponseEntity<List<StockReceiptDTO>> getAllReceipts() {
        return ResponseEntity.ok(warehouseService.getAllReceipts());
    }
}
