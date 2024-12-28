package com.dakodelabs.maintenance_app.controller;

import com.dakodelabs.maintenance_app.entity.MaintenanceRequest;
import com.dakodelabs.maintenance_app.service.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceRequestController {
    @Autowired
    private MaintenanceRequestService maintenanceRequestService;

    @PostMapping("/request")
    public ResponseEntity<MaintenanceRequest> createRequest(@RequestBody MaintenanceRequest request) {
        return ResponseEntity.ok(maintenanceRequestService.createRequest(request));
    }

    @GetMapping("/requests/{universityId}")
    public ResponseEntity<List<MaintenanceRequest>> getUserRequests(@PathVariable String universityId) {
        return ResponseEntity.ok(maintenanceRequestService.getUserRequests(universityId));
    }

    @DeleteMapping("/request/{requestId}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long requestId) {
        maintenanceRequestService.deleteRequest(requestId);
        return ResponseEntity.ok().build();
    }
} 