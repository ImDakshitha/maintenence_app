package com.dakodelabs.maintenance_app.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "maintenance_requests")
public class MaintenanceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime requestDate;
    private LocalDateTime requestTime;
    private String type;
    private String location;
    private String description;
    private Long requestedById;
    private String approvalStatus;
    private String status;

    // Default constructor
    public MaintenanceRequest() {
    }

    // Constructor with all fields
    public MaintenanceRequest(Long id, LocalDateTime requestDate, LocalDateTime requestTime, String type, String location, String description, Long requestedById, String approvalStatus, String status) {
        this.id = id;
        this.requestDate = requestDate;
        this.requestTime = requestTime;
        this.type = type;
        this.location = location;
        this.description = description;
        this.requestedById = requestedById;
        this.approvalStatus = approvalStatus;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public LocalDateTime getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(LocalDateTime requestTime) {
        this.requestTime = requestTime;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getRequestedById() {
        return requestedById;
    }

    public void setRequestedById(Long requestedById) {
        this.requestedById = requestedById;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
