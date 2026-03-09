package com.launchcode.bestcard_api.repository;

import com.launchcode.bestcard_api.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CardRepository extends JpaRepository<Card, Long> {
    Optional<Card> findByCardName(String cardName);
}

