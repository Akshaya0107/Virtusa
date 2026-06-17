package com.supplysync.modules.storemanager.service.impl;

import com.supplysync.modules.storemanager.dto.InventoryResponseDTO;
import com.supplysync.entity.Inventory;
import com.supplysync.entity.StockHistory;
import com.supplysync.modules.storemanager.mapper.InventoryMapper;
import com.supplysync.repository.InventoryRepository;
import com.supplysync.repository.StockHistoryRepository;
import com.supplysync.modules.storemanager.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired private InventoryRepository inventoryRepository;
    @Autowired private StockHistoryRepository stockHistoryRepository;
    @Autowired private InventoryMapper inventoryMapper;

    @Override
    public List<InventoryResponseDTO> getAllInventory() {
        return inventoryRepository.findAll().stream()
                .map(i -> {
                    InventoryResponseDTO dto = inventoryMapper.toResponseDto(i);
                    if (i.getQuantity() <= 0) dto.setStatus("OUT_OF_STOCK");
                    else if (i.getQuantity() <= i.getMinThreshold()) dto.setStatus("LOW_STOCK");
                    else dto.setStatus("AVAILABLE");
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InventoryResponseDTO updateStock(Long id, int quantity, String type, String reason) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory record not found"));
        
        int change = type.equalsIgnoreCase("ADD") ? quantity : -quantity;
        inventory.setQuantity(inventory.getQuantity() + change);
        
        stockHistoryRepository.save(StockHistory.builder()
                .product(inventory.getProduct())
                .changeQuantity(change)
                .type(type)
                .reason(reason)
                .build());

        return inventoryMapper.toResponseDto(inventoryRepository.save(inventory));
    }

    @Override
    public List<InventoryResponseDTO> getLowStockItems() {
        return inventoryRepository.findLowStockItems().stream()
                .map(inventoryMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<com.supplysync.entity.StockHistory> getMovementHistory() {
        return stockHistoryRepository.findAll();
    }
}
