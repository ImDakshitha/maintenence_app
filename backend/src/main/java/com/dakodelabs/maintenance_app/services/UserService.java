package com.dakodelabs.maintenance_app.services;

import com.dakodelabs.maintenance_app.model.User;
import com.dakodelabs.maintenance_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Hash password and save user
        user.setPassword(user.getPassword());
        return userRepository.save(user);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUser(Long id, User updatedUser) {
        User existingUser = getUserById(id);
        existingUser.setName(updatedUser.getName());
        existingUser.setPosition(updatedUser.getPosition());
        existingUser.setEmail(updatedUser.getEmail());
        return userRepository.save(existingUser);
    }
}
