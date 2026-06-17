package com.supplysync.repository;

import com.supplysync.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySku(String sku);
    
    @Query("SELECT p FROM Product p WHERE p.isDeleted = false")
    List<Product> findAllActive();
    
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.sku) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Product> searchProducts(String keyword);
    @Query("SELECT COUNT(p) FROM Product p WHERE p.isDeleted = false")
    long countAllActive();
}
