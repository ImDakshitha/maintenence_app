package com.dakodelabs.maintenance_app.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "maintenance_requests")
@Data
public class MaintenanceRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RequestType requestType;

    private String location;
    private String description;
    private LocalDateTime requestedDateTime;
    private LocalDateTime createdAt;
    private String universityId;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}