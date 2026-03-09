package com.launchcode.bestcard_api.controller;

import com.launchcode.bestcard_api.dto.CreateCardRequest;
import com.launchcode.bestcard_api.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    @PostMapping
    public ResponseEntity<?> createCard(
            @RequestBody CreateCardRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        cardService.createCard(request, email);

        return ResponseEntity.ok("Card added successfully");
    }
}
