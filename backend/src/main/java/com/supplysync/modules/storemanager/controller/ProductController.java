package com.supplysync.modules.storemanager.controller;

import com.supplysync.modules.storemanager.dto.ProductRequestDTO;
import com.supplysync.modules.storemanager.dto.ProductResponseDTO;
import com.supplysync.modules.storemanager.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@Tag(name = "Product Management", description = "CRUD operations for products")
public class ProductController {

    @Autowired private ProductService productService;

    @PostMapping
    @Operation(summary = "Create a new product")
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO request) {
        return ResponseEntity.ok(productService.createProduct(request));
    }

    @GetMapping
    @Operation(summary = "Get all active products")
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by ID")
    public ResponseEntity<ProductResponseDTO> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing product")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductRequestDTO request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Soft delete a product")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    @Operation(summary = "Search products by SKU or Name")
    public ResponseEntity<List<ProductResponseDTO>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProducts(keyword));
    }
}
