package com.dakodelabs.maintenance_app.dto;

public class AuthResponse {
    private String token;
    private String role;
    private String name;

    public AuthResponse(String token, String role, String name) {
        this.token = token;
        this.role = role;
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public String getRole() {
        return role;
    }

    public String getName() {
        return name;
    }
} 