package com.launchcode.bestcard_api.controller;

import com.launchcode.bestcard_api.dto.CardResponse;
import com.launchcode.bestcard_api.dto.CreateCardRequest;
import com.launchcode.bestcard_api.dto.UpdateCardRequest;
import com.launchcode.bestcard_api.service.CardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<CardResponse>> getCards(Authentication authentication) {

        String email = authentication.getName();

        List<CardResponse> cards = cardService.getCardsByUser(email);

        return ResponseEntity.ok(cards);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCard(
            @PathVariable Long id,
            @RequestBody UpdateCardRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        cardService.updateCard(id, request, email);

        return ResponseEntity.ok("Card updated successfully");
    }
}
