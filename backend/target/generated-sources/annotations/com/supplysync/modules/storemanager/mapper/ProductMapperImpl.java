package com.supplysync.modules.storemanager.mapper;

import com.supplysync.entity.Category;
import com.supplysync.entity.Product;
import com.supplysync.modules.storemanager.dto.ProductRequestDTO;
import com.supplysync.modules.storemanager.dto.ProductResponseDTO;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-18T10:51:06+0530",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.46.0.v20260407-0427, environment: Java 21.0.10 (Eclipse Adoptium)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public Product toEntity(ProductRequestDTO request) {
        if ( request == null ) {
            return null;
        }

        Product.ProductBuilder product = Product.builder();

        product.description( request.getDescription() );
        product.name( request.getName() );
        product.price( request.getPrice() );
        product.sku( request.getSku() );

        return product.build();
    }

    @Override
    public ProductResponseDTO toResponseDto(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductResponseDTO productResponseDTO = new ProductResponseDTO();

        productResponseDTO.setCategoryName( productCategoryName( product ) );
        productResponseDTO.setCreatedAt( product.getCreatedAt() );
        productResponseDTO.setDescription( product.getDescription() );
        productResponseDTO.setId( product.getId() );
        productResponseDTO.setName( product.getName() );
        productResponseDTO.setPrice( product.getPrice() );
        productResponseDTO.setQrCode( product.getQrCode() );
        productResponseDTO.setSku( product.getSku() );

        return productResponseDTO;
    }

    private String productCategoryName(Product product) {
        Category category = product.getCategory();
        if ( category == null ) {
            return null;
        }
        return category.getName();
    }
}
