package com.supplysync.modules.storemanager.service.impl;

import com.supplysync.modules.storemanager.dto.NotificationDTO;
import com.supplysync.entity.Notification;
import com.supplysync.modules.storemanager.mapper.NotificationMapper;
import com.supplysync.repository.NotificationRepository;
import com.supplysync.modules.storemanager.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired private NotificationRepository notificationRepository;
    @Autowired private NotificationMapper notificationMapper;

    @Override
    public List<NotificationDTO> getUnreadNotifications() {
        return notificationRepository.findByIsReadFalseOrderByCreatedAtDesc().stream()
                .map(notificationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<NotificationDTO> getAllNotifications() {
        return notificationRepository.findTop10ByOrderByCreatedAtDesc().stream()
                .map(notificationMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void markAsRead(Long id) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
    }

    @Override
    @Transactional
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void sendNotification(String title, String message, String type) {
        notificationRepository.save(Notification.builder()
                .title(title)
                .message(message)
                .type(type)
                .isRead(false)
                .build());
    }
}
