package com.launchcode.bestcard_api.repository;

import com.launchcode.bestcard_api.model.CardDiscount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardDiscountRepository extends JpaRepository<CardDiscount, Long> {
}
