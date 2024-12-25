package com.dakodelabs.maintenance_app.repository;

import com.dakodelabs.maintenance_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
//    Optional<User> findByUniversityId(String universityId);
}
