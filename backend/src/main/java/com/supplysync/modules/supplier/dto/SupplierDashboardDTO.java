package com.supplysync.modules.supplier.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;
import com.supplysync.entity.Notification;

@Data
@Builder
public class SupplierDashboardDTO {
    private long assignedOrders;
    private long pendingDeliveries;
    private long completedDeliveries;
    private long upcomingDeliveries;
    private List<Notification> notifications;
}
