package com.supplysync.modules.storemanager.controller;

import com.supplysync.modules.storemanager.dto.NotificationDTO;
import com.supplysync.modules.storemanager.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@Tag(name = "Notifications", description = "In-app notification system")
public class NotificationController {

    @Autowired private NotificationService notificationService;

    @GetMapping
    @Operation(summary = "Get recent notifications")
    public ResponseEntity<List<NotificationDTO>> getAll() {
        return ResponseEntity.ok(notificationService.getAllNotifications());
    }

    @GetMapping("/unread")
    @Operation(summary = "Get unread notifications")
    public ResponseEntity<List<NotificationDTO>> getUnread() {
        return ResponseEntity.ok(notificationService.getUnreadNotifications());
    }

    @PutMapping("/read/{id}")
    @Operation(summary = "Mark a notification as read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a notification")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.ok().build();
    }
}
