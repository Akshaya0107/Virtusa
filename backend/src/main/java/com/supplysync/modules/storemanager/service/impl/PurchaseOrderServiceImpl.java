package com.supplysync.modules.storemanager.service.impl;

import com.supplysync.modules.storemanager.dto.PurchaseOrderRequestDTO;
import com.supplysync.modules.storemanager.dto.PurchaseOrderResponseDTO;
import com.supplysync.entity.Product;
import com.supplysync.entity.PurchaseOrder;
import com.supplysync.entity.PurchaseOrderItem;
import com.supplysync.entity.Supplier;
import com.supplysync.modules.storemanager.mapper.PurchaseOrderMapper;
import com.supplysync.repository.ProductRepository;
import com.supplysync.repository.PurchaseOrderRepository;
import com.supplysync.repository.SupplierRepository;
import com.supplysync.modules.storemanager.service.PurchaseOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PurchaseOrderServiceImpl implements PurchaseOrderService {

    @Autowired private PurchaseOrderRepository purchaseOrderRepository;
    @Autowired private SupplierRepository supplierRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private PurchaseOrderMapper purchaseOrderMapper;

    @Override
    @Transactional
    public PurchaseOrderResponseDTO createOrder(PurchaseOrderRequestDTO request) {
        Supplier supplier = supplierRepository.findById(request.getSupplier_id())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        PurchaseOrder po = PurchaseOrder.builder()
                .orderNumber("PO-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .supplier(supplier)
                .status(PurchaseOrder.OrderStatus.PENDING)
                .expectedDeliveryDate(request.getExpectedDeliveryDate())
                .build();

        BigDecimal total = BigDecimal.ZERO;
        for (PurchaseOrderRequestDTO.OrderItemDTO itemDto : request.getItems()) {
            Product product = productRepository.findById(itemDto.getProduct_id())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            
            PurchaseOrderItem item = PurchaseOrderItem.builder()
                    .purchaseOrder(po)
                    .product(product)
                    .quantity(itemDto.getQuantity())
                    .unitPrice(itemDto.getUnitPrice())
                    .build();
            po.getItems().add(item);
            total = total.add(itemDto.getUnitPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity())));
        }
        po.setTotalAmount(total);

        return purchaseOrderMapper.toResponseDto(purchaseOrderRepository.save(po));
    }

    @Override
    public List<PurchaseOrderResponseDTO> getAllOrders() {
        return purchaseOrderRepository.findByOrderByOrderDateDesc().stream()
                .map(purchaseOrderMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public PurchaseOrderResponseDTO getOrderById(Long id) {
        PurchaseOrder po = purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));
        return purchaseOrderMapper.toResponseDto(po);
    }

    @Override
    @Transactional
    public PurchaseOrderResponseDTO updateStatus(Long id, String status) {
        PurchaseOrder po = purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));
        po.setStatus(PurchaseOrder.OrderStatus.valueOf(status.toUpperCase()));
        return purchaseOrderMapper.toResponseDto(purchaseOrderRepository.save(po));
    }
}
