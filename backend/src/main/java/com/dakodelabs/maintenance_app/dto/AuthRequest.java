package com.dakodelabs.maintenance_app.dto;

public class AuthRequest {
    private String universityId;
    private String password;
    
    public AuthRequest() {
    }

    public String getUniversityId() {
        return universityId;
    }

    public void setUniversityId(String universityId) {
        this.universityId = universityId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
} 