package com.dakodelabs.maintenance_app.repository;

import com.dakodelabs.maintenance_app.entity.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
    List<MaintenanceRequest> findByUniversityId(String universityId);
} 