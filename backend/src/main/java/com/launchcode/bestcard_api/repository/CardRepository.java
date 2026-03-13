package com.launchcode.bestcard_api.repository;

import com.launchcode.bestcard_api.model.Card;
import com.launchcode.bestcard_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByUser(User user);
}

