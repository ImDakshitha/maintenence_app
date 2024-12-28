package com.dakodelabs.maintenance_app.service;

import com.dakodelabs.maintenance_app.entity.MaintenanceRequest;
import com.dakodelabs.maintenance_app.repository.MaintenanceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceRequestService {
    @Autowired
    private MaintenanceRequestRepository maintenanceRequestRepository;

    public MaintenanceRequest createRequest(MaintenanceRequest request) {
        return maintenanceRequestRepository.save(request);
    }

    public List<MaintenanceRequest> getUserRequests(String universityId) {
        return maintenanceRequestRepository.findByUniversityId(universityId);
    }

    public void deleteRequest(Long requestId) {
        maintenanceRequestRepository.deleteById(requestId);
    }
} 