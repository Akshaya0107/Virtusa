package com.supplysync.modules.storemanager.mapper;

import com.supplysync.modules.storemanager.dto.PurchaseOrderResponseDTO;
import com.supplysync.entity.PurchaseOrder;
import com.supplysync.entity.PurchaseOrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PurchaseOrderMapper {
    @Mapping(target = "supplierId", source = "supplier.id")
    @Mapping(target = "supplierName", source = "supplier.name")
    @Mapping(target = "items", source = "items")
    PurchaseOrderResponseDTO toResponseDto(PurchaseOrder po);

    @Mapping(target = "product_id", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    PurchaseOrderResponseDTO.OrderItemResponseDTO toItemResponseDto(PurchaseOrderItem item);
}
