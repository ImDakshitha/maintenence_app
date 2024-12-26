package com.dakodelabs.maintenance_app.services;

import com.dakodelabs.maintenance_app.dto.AuthRequest;
import com.dakodelabs.maintenance_app.dto.AuthResponse;
import com.dakodelabs.maintenance_app.model.User;
import com.dakodelabs.maintenance_app.repository.UserRepository;
import com.dakodelabs.maintenance_app.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUniversityId(request.getUniversityId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getUniversityId());

        return new AuthResponse(token, user.getRole(), user.getName());
    }

    public User register(User user) {
        // Validate unique fields
        if (userRepository.existsByUniversityId(user.getUniversityId())) {
            throw new RuntimeException("University ID already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        return userRepository.save(user);
    }
} 