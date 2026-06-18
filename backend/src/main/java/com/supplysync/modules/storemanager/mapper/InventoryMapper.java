package com.supplysync.modules.storemanager.mapper;

import com.supplysync.modules.storemanager.dto.InventoryResponseDTO;
import com.supplysync.entity.Inventory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "productSku", source = "product.sku")
    @Mapping(target = "category", source = "product.category.name")
    @Mapping(target = "status", ignore = true)
    InventoryResponseDTO toResponseDto(Inventory inventory);
}
