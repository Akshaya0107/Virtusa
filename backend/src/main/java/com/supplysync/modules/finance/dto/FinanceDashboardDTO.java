package com.supplysync.modules.finance.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class FinanceDashboardDTO {
    private long pendingApprovals;
    private long approvedPurchaseOrders;
    private BigDecimal totalProcurementCost;
    private BigDecimal monthlySpend;
}
