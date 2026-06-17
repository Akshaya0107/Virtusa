package com.supplysync.controller;

import com.supplysync.dto.ContactRequestDto;
import com.supplysync.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/contact")
@Tag(name = "Contact", description = "Endpoints for contact messages")
public class ContactController {
    @Autowired
    private ContactService contactService;

    @PostMapping
    @Operation(summary = "Submit a contact message")
    public ResponseEntity<?> submitMessage(@RequestBody ContactRequestDto request) {
        contactService.saveMessage(request);
        return ResponseEntity.ok("Message sent successfully!");
    }

    @GetMapping
    @PreAuthorize("hasRole('FINANCE_ADMIN')")
    @Operation(summary = "Get all contact messages (Admin only)")
    public ResponseEntity<?> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }
}
