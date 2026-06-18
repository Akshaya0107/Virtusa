package com.supplysync.modules.storemanager.mapper;

import com.supplysync.entity.Category;
import com.supplysync.entity.Inventory;
import com.supplysync.entity.Product;
import com.supplysync.modules.storemanager.dto.InventoryResponseDTO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-18T14:36:06+0530",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class InventoryMapperImpl implements InventoryMapper {

    @Override
    public InventoryResponseDTO toResponseDto(Inventory inventory) {
        if ( inventory == null ) {
            return null;
        }

        InventoryResponseDTO inventoryResponseDTO = new InventoryResponseDTO();

        inventoryResponseDTO.setProductId( inventoryProductId( inventory ) );
        inventoryResponseDTO.setProductName( inventoryProductName( inventory ) );
        inventoryResponseDTO.setProductSku( inventoryProductSku( inventory ) );
        inventoryResponseDTO.setCategory( inventoryProductCategoryName( inventory ) );
        inventoryResponseDTO.setId( inventory.getId() );
        inventoryResponseDTO.setLocation( inventory.getLocation() );
        inventoryResponseDTO.setMinThreshold( inventory.getMinThreshold() );
        inventoryResponseDTO.setQuantity( inventory.getQuantity() );
        inventoryResponseDTO.setUpdatedAt( inventory.getUpdatedAt() );

        return inventoryResponseDTO;
    }

    private Long inventoryProductId(Inventory inventory) {
        Product product = inventory.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getId();
    }

    private String inventoryProductName(Inventory inventory) {
        Product product = inventory.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getName();
    }

    private String inventoryProductSku(Inventory inventory) {
        Product product = inventory.getProduct();
        if ( product == null ) {
            return null;
        }
        return product.getSku();
    }

    private String inventoryProductCategoryName(Inventory inventory) {
        Product product = inventory.getProduct();
        if ( product == null ) {
            return null;
        }
        Category category = product.getCategory();
        if ( category == null ) {
            return null;
        }
        return category.getName();
    }
}
