package com.dakodelabs.maintenance_app.repository;

import com.dakodelabs.maintenance_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
//    Optional<User> findByUniversityId(String universityId);
}
