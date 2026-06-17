package com.supplysync.modules.storemanager.service;

import java.io.InputStream;
import java.util.Map;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JasperReportService {

    public byte[] generateReport(String reportName, List<?> data, Map<String, Object> parameters) throws JRException {
        // Load the .jrxml file (or .jasper if pre-compiled)
        // For simplicity in this environment, I'll assume we have a basic template
        // In a real app, you'd load from src/main/resources/reports/
        
        // Mocking a report generation for now to ensure flow works
        // We will create the actual .jrxml file in the resources folder
        
        try {
            InputStream reportStream = getClass().getResourceAsStream("/reports/" + reportName + ".jrxml");
            JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(data);
            parameters.put("createdBy", "SupplySync System");
            
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            return JasperExportManager.exportReportToPdf(jasperPrint);
        } catch (Exception e) {
            e.printStackTrace();
            throw new JRException("Error generating report: " + e.getMessage());
        }
    }
}
