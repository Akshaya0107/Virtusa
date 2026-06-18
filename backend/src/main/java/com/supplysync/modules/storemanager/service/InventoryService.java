package com.supplysync.modules.storemanager.service;

import com.supplysync.modules.storemanager.dto.InventoryResponseDTO;
import java.util.List;

public interface InventoryService {
    List<InventoryResponseDTO> getAllInventory();
    InventoryResponseDTO updateStock(Long id, int quantity, String type, String reason);
    List<InventoryResponseDTO> getLowStockItems();
    List<com.supplysync.entity.StockMovement> getMovementHistory();
}
