package com.supplysync.modules.warehouse.service.impl;

import com.supplysync.entity.*;
import com.supplysync.modules.warehouse.dto.StockReceiptDTO;
import com.supplysync.modules.warehouse.dto.WarehouseDashboardDTO;
import com.supplysync.modules.warehouse.service.WarehouseService;
import com.supplysync.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WarehouseServiceImpl implements WarehouseService {

    @Autowired private StockReceiptRepository receiptRepository;
    @Autowired private InventoryRepository inventoryRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private SupplierRepository supplierRepository;
    @Autowired private DispatchRepository dispatchRepository;
    @Autowired private NotificationRepository notificationRepository;

    @Override
    public WarehouseDashboardDTO getDashboardStats() {
        long totalProducts = receiptRepository.count();
        long currentStock = inventoryRepository.findAll().stream().mapToLong(Inventory::getQuantity).sum();
        long lowStock = inventoryRepository.findAll().stream().filter(i -> i.getQuantity() <= i.getMinThreshold()).count();
        
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        long todayDispatches = dispatchRepository.findByDispatchDateBetween(startOfDay, endOfDay).size();

        return WarehouseDashboardDTO.builder()
                .totalProductsReceived(totalProducts)
                .currentStockAvailable(currentStock)
                .lowStockProducts(lowStock)
                .todayDispatches(todayDispatches)
                .notifications(notificationRepository.findAll())
                .build();
    }

    @Override
    @Transactional
    public StockReceiptDTO receiveStock(StockReceiptDTO dto) {
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        Supplier supplier = null;
        if (dto.getSupplierId() != null) {
            supplier = supplierRepository.findById(dto.getSupplierId()).orElse(null);
        }

        StockReceipt receipt = StockReceipt.builder()
                .product(product)
                .supplier(supplier)
                .quantityReceived(dto.getQuantityReceived())
                .batchNumber(dto.getBatchNumber())
                .conditionStatus(dto.getConditionStatus())
                .qrCode(dto.getQrCode())
                .build();

        receiptRepository.save(receipt);

        // Update Inventory
        Inventory inventory = inventoryRepository.findByProduct(product)
                .orElse(Inventory.builder().product(product).quantity(0).minThreshold(10).build());
        
        inventory.setQuantity(inventory.getQuantity() + dto.getQuantityReceived());
        inventoryRepository.save(inventory);

        return mapToDTO(receipt);
    }

    @Override
    public List<StockReceiptDTO> getAllReceipts() {
        return receiptRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private StockReceiptDTO mapToDTO(StockReceipt receipt) {
        StockReceiptDTO dto = new StockReceiptDTO();
        dto.setId(receipt.getId());
        dto.setProductId(receipt.getProduct().getId());
        dto.setProductName(receipt.getProduct().getName());
        dto.setQuantityReceived(receipt.getQuantityReceived());
        dto.setBatchNumber(receipt.getBatchNumber());
        dto.setConditionStatus(receipt.getConditionStatus());
        dto.setQrCode(receipt.getQrCode());
        dto.setReceivedDate(receipt.getReceivedDate().toString());
        if (receipt.getSupplier() != null) {
            dto.setSupplierId(receipt.getSupplier().getId());
            dto.setSupplierName(receipt.getSupplier().getName());
        }
        return dto;
    }
}
