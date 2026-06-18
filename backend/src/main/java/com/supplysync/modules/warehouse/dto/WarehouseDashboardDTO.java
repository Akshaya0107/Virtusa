package com.supplysync.modules.warehouse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WarehouseDashboardDTO {
    private long totalProductsReceived;
    private long currentStockAvailable;
    private long lowStockProducts;
    private long todayDispatches;
    private Object recentActivities; // For simplification, using Object, can be List<ActivityDTO>
    private Object notifications;
}
