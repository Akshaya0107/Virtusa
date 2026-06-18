package com.supplysync.repository;

import com.supplysync.entity.POApproval;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface POApprovalRepository extends JpaRepository<POApproval, Long> {
    List<POApproval> findByPurchaseOrderIdOrderByReviewedAtDesc(Long poId);
}
