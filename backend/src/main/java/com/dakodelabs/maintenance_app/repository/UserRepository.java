package com.dakodelabs.maintenance_app.repository;

import com.dakodelabs.maintenance_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUniversityId(String universityId);
    Optional<User> findByEmail(String email);
    boolean existsByUniversityId(String universityId);
    boolean existsByEmail(String email);
}
