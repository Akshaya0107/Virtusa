package com.supplysync.modules.storemanager.mapper;

import com.supplysync.modules.storemanager.dto.ProductRequestDTO;
import com.supplysync.modules.storemanager.dto.ProductResponseDTO;
import com.supplysync.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "qrCode", ignore = true)
    @Mapping(target = "isDeleted", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Product toEntity(ProductRequestDTO request);

    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(target = "currentStock", ignore = true) // Will be updated in service
    ProductResponseDTO toResponseDto(Product product);
}
