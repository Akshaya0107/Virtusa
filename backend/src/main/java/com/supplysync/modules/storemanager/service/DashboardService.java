package com.supplysync.modules.storemanager.service;

import com.supplysync.modules.storemanager.dto.DashboardSummaryDTO;

public interface DashboardService {
    DashboardSummaryDTO getSummary();
    Object getSalesAnalytics();
}
