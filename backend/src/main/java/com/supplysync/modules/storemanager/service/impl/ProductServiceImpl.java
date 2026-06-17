package com.supplysync.modules.storemanager.service.impl;

import com.supplysync.modules.storemanager.dto.ProductRequestDTO;
import com.supplysync.modules.storemanager.dto.ProductResponseDTO;
import com.supplysync.entity.Category;
import com.supplysync.entity.Inventory;
import com.supplysync.entity.Product;
import com.supplysync.modules.storemanager.mapper.ProductMapper;
import com.supplysync.repository.CategoryRepository;
import com.supplysync.repository.InventoryRepository;
import com.supplysync.repository.ProductRepository;
import com.supplysync.modules.storemanager.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired private ProductRepository productRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private InventoryRepository inventoryRepository;
    @Autowired private ProductMapper productMapper;

    @Override
    @Transactional
    public ProductResponseDTO createProduct(ProductRequestDTO request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        Product product = productMapper.toEntity(request);
        product.setCategory(category);
        product.setQrCode("QR-" + request.getSku());
        Product savedProduct = productRepository.save(product);

        // Initialize inventory
        inventoryRepository.save(Inventory.builder()
                .product(savedProduct)
                .quantity(0)
                .build());

        return mapToResponse(savedProduct);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAllActive().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .filter(p -> !p.isDeleted())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return mapToResponse(product);
    }

    @Override
    @Transactional
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        
        if (!product.getCategory().getId().equals(request.getCategoryId())) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            product.setCategory(category);
        }

        return mapToResponse(productRepository.save(product));
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        product.setDeleted(true);
        productRepository.save(product);
    }

    @Override
    public List<ProductResponseDTO> searchProducts(String keyword) {
        return productRepository.searchProducts(keyword).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ProductResponseDTO mapToResponse(Product product) {
        ProductResponseDTO dto = productMapper.toResponseDto(product);
        inventoryRepository.findByProductId(product.getId())
                .ifPresent(inv -> dto.setCurrentStock(inv.getQuantity()));
        return dto;
    }
}
