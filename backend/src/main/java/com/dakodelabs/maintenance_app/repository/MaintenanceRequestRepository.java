package com.dakodelabs.maintenance_app.repository;

import com.dakodelabs.maintenance_app.model.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {
}
