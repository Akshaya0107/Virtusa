package com.supplysync.modules.storemanager.service;

import com.supplysync.modules.storemanager.dto.PurchaseOrderRequestDTO;
import com.supplysync.modules.storemanager.dto.PurchaseOrderResponseDTO;
import java.util.List;

public interface PurchaseOrderService {
    PurchaseOrderResponseDTO createOrder(PurchaseOrderRequestDTO request);
    List<PurchaseOrderResponseDTO> getAllOrders();
    PurchaseOrderResponseDTO getOrderById(Long id);
    PurchaseOrderResponseDTO updateStatus(Long id, String status);
}
