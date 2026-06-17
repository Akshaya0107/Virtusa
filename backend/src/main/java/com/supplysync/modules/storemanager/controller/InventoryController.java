package com.supplysync.modules.storemanager.controller;

import com.supplysync.modules.storemanager.dto.InventoryResponseDTO;
import com.supplysync.modules.storemanager.service.InventoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@Tag(name = "Inventory", description = "Stock management operations")
public class InventoryController {

    @Autowired private InventoryService inventoryService;

    @GetMapping
    @Operation(summary = "Get all inventory records")
    public ResponseEntity<List<InventoryResponseDTO>> getAll() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @PostMapping("/update/{id}")
    @Operation(summary = "Update stock quantity with type")
    public ResponseEntity<InventoryResponseDTO> updateStock(@PathVariable Long id, @RequestBody java.util.Map<String, Object> request) {
        String type = (String) request.get("type");
        int amount = (int) request.get("amount");
        return ResponseEntity.ok(inventoryService.updateStock(id, amount, type, "Manual Update"));
    }

    @GetMapping("/history")
    @Operation(summary = "Get stock movement history")
    public ResponseEntity<List<com.supplysync.entity.StockMovement>> getHistory() {
        return ResponseEntity.ok(inventoryService.getMovementHistory());
    }
}
