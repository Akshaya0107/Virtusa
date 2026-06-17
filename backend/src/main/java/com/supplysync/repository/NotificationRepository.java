package com.supplysync.repository;

import com.supplysync.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByIsReadFalseOrderByCreatedAtDesc();
    List<Notification> findTop10ByOrderByCreatedAtDesc();
}
