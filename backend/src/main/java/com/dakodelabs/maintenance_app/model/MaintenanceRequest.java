package com.dakodelabs.maintenance_app.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class MaintenanceRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate requestDate;
    private LocalTime requestTime;
    private String type; // MAINTENANCE, WORK
    private String location;

    @Column(length = 1000)
    private String description;
    private String approvalStatus; // PENDING, APPROVED, REJECTED

    @ManyToOne
    private User requestedBy;

    public Long getId() {
        return id;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public LocalTime getRequestTime() {
        return requestTime;
    }

    public String getType() {
        return type;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public String getApprovalStatus() {
        return approvalStatus;
    }

    public User getRequestedBy() {
        return requestedBy;
    }

    public void setRequestedBy(User requestedBy) {
        this.requestedBy = requestedBy;
    }

    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setRequestTime(LocalTime requestTime) {
        this.requestTime = requestTime;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
