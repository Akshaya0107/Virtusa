package com.supplysync.modules.storemanager.service;

import java.util.Map;

public interface ReportService {
    byte[] generatePdfReport(String reportName, Map<String, Object> parameters);
}
