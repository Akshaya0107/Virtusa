package com.supplysync.repository;

import com.supplysync.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByProductId(Long productId);
    Optional<Inventory> findByProduct(com.supplysync.entity.Product product);
    
    @Query("SELECT i FROM Inventory i WHERE i.quantity <= i.minThreshold")
    List<Inventory> findLowStockItems();
    @Query("SELECT COUNT(i) FROM Inventory i WHERE i.quantity <= i.minThreshold")
    long countLowStockItems();
}
