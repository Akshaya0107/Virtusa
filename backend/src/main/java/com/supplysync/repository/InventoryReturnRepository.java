package com.supplysync.repository;

import com.supplysync.entity.InventoryReturn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryReturnRepository extends JpaRepository<InventoryReturn, Long> {
}
