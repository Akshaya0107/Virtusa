package com.supplysync.modules.storemanager.service;

import com.supplysync.modules.storemanager.dto.NotificationDTO;
import java.util.List;

public interface NotificationService {
    List<NotificationDTO> getUnreadNotifications();
    List<NotificationDTO> getAllNotifications();
    void markAsRead(Long id);
    void deleteNotification(Long id);
    void sendNotification(String title, String message, String type);
}
