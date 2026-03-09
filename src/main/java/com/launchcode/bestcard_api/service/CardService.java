package com.launchcode.bestcard_api.service;


import com.launchcode.bestcard_api.exception.BadRequestException;
import com.launchcode.bestcard_api.model.Card;
import com.launchcode.bestcard_api.model.User;
import com.launchcode.bestcard_api.repository.CardRepository;
import com.launchcode.bestcard_api.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    public CardService(CardRepository cardRepository, UserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
    }

    public Card createCard(Long userId, Card card) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BadRequestException("User not found"));

        card.setUser(user);
        return cardRepository.save(card);
    }

}
