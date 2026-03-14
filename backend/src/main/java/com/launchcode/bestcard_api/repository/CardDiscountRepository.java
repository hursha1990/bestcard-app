package com.launchcode.bestcard_api.repository;

import com.launchcode.bestcard_api.model.Card;
import com.launchcode.bestcard_api.model.CardDiscount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardDiscountRepository extends JpaRepository<CardDiscount, Long> {
    Optional<CardDiscount> findByCard(Card card);
}
