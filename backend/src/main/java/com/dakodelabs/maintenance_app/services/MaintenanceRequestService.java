package com.dakodelabs.maintenance_app.services;

import com.dakodelabs.maintenance_app.model.MaintenanceRequest;
import com.dakodelabs.maintenance_app.repository.MaintenanceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MaintenanceRequestService {
    @Autowired
    private MaintenanceRequestRepository requestRepository;

    public MaintenanceRequest createRequest(MaintenanceRequest request) {
        return requestRepository.save(request);
    }

    public MaintenanceRequest getRequestById(Long id) {
        return requestRepository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public MaintenanceRequest approveRequest(Long id) {
        MaintenanceRequest request = getRequestById(id);
        request.setApprovalStatus("APPROVED");
        return requestRepository.save(request);
    }
    public void deleteMaintenanceRequestById(Long id) {
        if (requestRepository.existsById(id)) {
            requestRepository.deleteById(id);
        } else {
            throw new RuntimeException("Maintenance request with ID " + id + " not found");
        }
    }
}

