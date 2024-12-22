package com.dakodelabs.maintenance_app.controller;

import com.dakodelabs.maintenance_app.model.MaintenanceRequest;
import com.dakodelabs.maintenance_app.services.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/requests")
public class MaintenanceRequestController {
    @Autowired
    private MaintenanceRequestService requestService;

    @PostMapping
    public ResponseEntity<MaintenanceRequest> createRequest(@RequestBody MaintenanceRequest request) {
        return ResponseEntity.ok(requestService.createRequest(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRequest> getRequest(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<MaintenanceRequest> approveRequest(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.approveRequest(id));
    }
}
