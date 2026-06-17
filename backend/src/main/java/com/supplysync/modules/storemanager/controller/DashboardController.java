package com.supplysync.modules.storemanager.controller;

import com.supplysync.modules.storemanager.dto.DashboardSummaryDTO;
import com.supplysync.modules.storemanager.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@Tag(name = "Dashboard", description = "Dashboard summary and analytics")
public class DashboardController {

    @Autowired private DashboardService dashboardService;

    @GetMapping("/summary")
    @Operation(summary = "Get dashboard summary cards")
    public ResponseEntity<DashboardSummaryDTO> getSummary() {
        return ResponseEntity.ok(dashboardService.getSummary());
    }

    @GetMapping("/sales")
    @Operation(summary = "Get sales analytics data")
    public ResponseEntity<?> getSalesAnalytics() {
        return ResponseEntity.ok(dashboardService.getSalesAnalytics());
    }
}
