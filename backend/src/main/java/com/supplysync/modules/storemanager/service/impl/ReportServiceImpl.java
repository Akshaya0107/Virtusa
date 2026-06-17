package com.supplysync.modules.storemanager.service.impl;

import com.supplysync.modules.storemanager.service.JasperReportService;
import com.supplysync.modules.storemanager.service.ReportService;
import com.supplysync.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired private JasperReportService jasperService;
    @Autowired private ProductRepository productRepository;
    @Autowired private InventoryRepository inventoryRepository;
    @Autowired private PurchaseOrderRepository purchaseOrderRepository;
    @Autowired private SalesRecordRepository salesRecordRepository;

    @Override
    public byte[] generatePdfReport(String reportName, Map<String, Object> parameters) {
        try {
            List<?> data;
            String templateName;
            
            switch (reportName.toLowerCase()) {
                case "product":
                    data = productRepository.findAll();
                    templateName = "products";
                    parameters.put("reportTitle", "Product Catalog Report");
                    break;
                case "inventory":
                    data = inventoryRepository.findAll();
                    templateName = "inventory";
                    parameters.put("reportTitle", "Inventory Stock Report");
                    break;
                case "purchase":
                case "order":
                    data = purchaseOrderRepository.findAll();
                    templateName = "orders";
                    parameters.put("reportTitle", "Purchase Order History");
                    break;
                case "sales":
                case "revenue":
                    data = salesRecordRepository.findAll();
                    templateName = "sales";
                    parameters.put("reportTitle", "Sales Performance Report");
                    break;
                default:
                    throw new RuntimeException("Invalid report type");
            }

            return jasperService.generateReport(templateName, data, parameters);
        } catch (Exception e) {
            e.printStackTrace();
            return new byte[0];
        }
    }
}
