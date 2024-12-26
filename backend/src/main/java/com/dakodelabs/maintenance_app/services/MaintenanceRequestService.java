package com.dakodelabs.maintenance_app.services;

import com.dakodelabs.maintenance_app.model.MaintenanceRequest;
import com.dakodelabs.maintenance_app.repository.MaintenanceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MaintenanceRequestService {

    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    public MaintenanceRequest createRequest(MaintenanceRequest request) {
        LocalDateTime now = LocalDateTime.now();
        request.setRequestDate(now);
        request.setRequestTime(now);
        request.setApprovalStatus("PENDING");
        request.setStatus("OPEN");
        return maintenanceRequestRepository.save(request);
    }

    public List<MaintenanceRequest> getAllRequests() {
        return maintenanceRequestRepository.findAll();
    }

    public MaintenanceRequest getRequestById(Long id) {
        return maintenanceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public MaintenanceRequest approveRequest(Long id) {
        MaintenanceRequest request = getRequestById(id);
        request.setStatus("APPROVED"); // Assuming you have a status field
        return maintenanceRequestRepository.save(request);
    }

    public void deleteMaintenanceRequestById(Long id) {
        if (maintenanceRequestRepository.existsById(id)) {
            maintenanceRequestRepository.deleteById(id);
        } else {
            throw new RuntimeException("Maintenance request with ID " + id + " not found");
        }
    }
}

