package com.supplysync.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SalesAnalyticsDTO {
    private BigDecimal totalRevenue;
    private long totalSalesCount;
    private List<DailySalesDTO> dailyTrends;
    private List<TopProductDTO> topProducts;

    @Data
    @AllArgsConstructor
    public static class DailySalesDTO {
        private String date;
        private BigDecimal revenue;
    }

    @Data
    @AllArgsConstructor
    public static class TopProductDTO {
        private String name;
        private int quantitySold;
        private BigDecimal revenue;
    }
}
