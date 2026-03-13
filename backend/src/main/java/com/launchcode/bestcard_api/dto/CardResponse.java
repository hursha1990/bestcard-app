package com.launchcode.bestcard_api.dto;

public class CardResponse {

    private Long id;
    private String cardName;
    private String category;
    private Double discount;

    public CardResponse(Long id, String cardName, String category, Double discount) {
        this.id = id;
        this.cardName = cardName;
        this.category = category;
        this.discount = discount;
    }

    public Long getId() {
        return id;
    }

    public String getCardName() {
        return cardName;
    }

    public String getCategory() {
        return category;
    }

    public Double getDiscount() {
        return discount;
    }
}