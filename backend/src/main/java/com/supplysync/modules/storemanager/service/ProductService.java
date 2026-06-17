package com.supplysync.modules.storemanager.service;

import com.supplysync.modules.storemanager.dto.ProductRequestDTO;
import com.supplysync.modules.storemanager.dto.ProductResponseDTO;
import java.util.List;

public interface ProductService {
    ProductResponseDTO createProduct(ProductRequestDTO request);
    List<ProductResponseDTO> getAllProducts();
    ProductResponseDTO getProductById(Long id);
    ProductResponseDTO updateProduct(Long id, ProductRequestDTO request);
    void deleteProduct(Long id);
    List<ProductResponseDTO> searchProducts(String keyword);
}
