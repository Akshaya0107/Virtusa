package com.supplysync.modules.storemanager.controller;

import com.supplysync.modules.storemanager.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/reports")
@Tag(name = "Reports", description = "PDF report generation")
public class ReportController {

    @Autowired private ReportService reportService;

    @PostMapping("/generate/{type}")
    @Operation(summary = "Generate PDF report by type")
    public ResponseEntity<byte[]> generateReport(@PathVariable String type) {
        byte[] pdf = reportService.generatePdfReport(type, new HashMap<>());
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", type + "_report.pdf");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(pdf);
    }
}
