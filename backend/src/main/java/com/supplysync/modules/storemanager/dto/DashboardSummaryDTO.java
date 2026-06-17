package com.supplysync.modules.storemanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryDTO {
    private long totalProducts;
    private long totalSuppliers;
    private long lowStockCount;
    private long pendingOrdersCount;
    private int totalInventoryItems;
    private BigDecimal monthlyRevenue;
    private List<RecentActivityDTO> recentActivities;
    private List<NotificationDTO> recentNotifications;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RecentActivityDTO {
        private String action;
        private String details;
        private String timeAgo;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class NotificationDTO {
        private String title;
        private String message;
        private String type;
        private String timeAgo;
    }
}
