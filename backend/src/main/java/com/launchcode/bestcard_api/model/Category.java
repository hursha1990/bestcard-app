package com.launchcode.bestcard_api.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private LocalDateTime createdAt = LocalDateTime.now();

    // One category to Many card discounts
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<CardDiscount> cardDiscounts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<CardDiscount> getCardDiscounts() {
        return cardDiscounts;
    }

    public void setCardDiscounts(List<CardDiscount> cardDiscounts) {
        this.cardDiscounts = cardDiscounts;
    }
}