package com.supplysync.modules.warehouse.service;

import com.supplysync.modules.warehouse.dto.WarehouseDashboardDTO;
import com.supplysync.modules.warehouse.dto.StockReceiptDTO;
import java.util.List;

public interface WarehouseService {
    WarehouseDashboardDTO getDashboardStats();
    StockReceiptDTO receiveStock(StockReceiptDTO receiptDTO);
    List<StockReceiptDTO> getAllReceipts();
}
