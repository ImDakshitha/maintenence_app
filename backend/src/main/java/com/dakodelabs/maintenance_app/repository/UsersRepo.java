package com.dakodelabs.maintenance_app.repository;


import com.dakodelabs.maintenance_app.entity.OurUsers;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepo extends JpaRepository<OurUsers, Integer> {

    Optional<OurUsers> findByUniversityId(String universityId);
}
