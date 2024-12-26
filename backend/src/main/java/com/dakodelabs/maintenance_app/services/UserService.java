package com.dakodelabs.maintenance_app.services;

import com.dakodelabs.maintenance_app.model.User;
import com.dakodelabs.maintenance_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        System.out.print(id);
        return userRepository.findById(id)
                .orElse(null);
    }

    public User updateUser(Long id, User updatedUser) {
        User existingUser = getUserById(id);
        existingUser.setName(updatedUser.getName());
        existingUser.setPosition(updatedUser.getPosition());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setRole(updatedUser.getRole());
        existingUser.setUniversityId(updatedUser.getUniversityId());
        existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        return userRepository.save(existingUser);
    }
}
