package com.dakodelabs.maintenance_app.controller;

import com.dakodelabs.maintenance_app.model.MaintenanceRequest;
import com.dakodelabs.maintenance_app.services.MaintenanceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class MaintenanceRequestController {
    @Autowired
    private MaintenanceRequestService requestService;


    @PostMapping
    public ResponseEntity<MaintenanceRequest> createRequest(@RequestBody MaintenanceRequest request) {
        System.out.println("Requested By ID: " + request.getRequestedById());
        MaintenanceRequest createdRequest = requestService.createRequest(request);
        

        return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceRequest> getRequest(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getRequestById(id));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<MaintenanceRequest> approveRequest(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.approveRequest(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMaintenanceRequest(@PathVariable Long id) {
        try {
            requestService.deleteMaintenanceRequestById(id);
            return ResponseEntity.ok("Maintenance request with ID " + id + " deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @GetMapping
    public List<MaintenanceRequest> getAllRequests() {
        return requestService.getAllRequests();
    }
}
