package com.launchcode.bestcard_api.repository;

import com.launchcode.bestcard_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<User, Long> {
}

