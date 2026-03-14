package com.launchcode.bestcard_api.service;


import com.launchcode.bestcard_api.dto.CardResponse;
import com.launchcode.bestcard_api.dto.CreateCardRequest;
import com.launchcode.bestcard_api.dto.UpdateCardRequest;
import com.launchcode.bestcard_api.exception.BadRequestException;
import com.launchcode.bestcard_api.exception.CardNotFoundException;
import com.launchcode.bestcard_api.exception.UnauthorizedException;
import com.launchcode.bestcard_api.exception.UserNotFoundException;
import com.launchcode.bestcard_api.model.Card;
import com.launchcode.bestcard_api.model.CardDiscount;
import com.launchcode.bestcard_api.model.Category;
import com.launchcode.bestcard_api.model.User;
import com.launchcode.bestcard_api.repository.CardDiscountRepository;
import com.launchcode.bestcard_api.repository.CardRepository;
import com.launchcode.bestcard_api.repository.CategoryRepository;
import com.launchcode.bestcard_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

    private final CardRepository cardRepository;
    private final CategoryRepository categoryRepository;
    private final CardDiscountRepository cardDiscountRepository;
    private final UserRepository userRepository;

    public CardService(CardRepository cardRepository,
                       CategoryRepository categoryRepository,
                       CardDiscountRepository cardDiscountRepository,
                       UserRepository userRepository) {
        this.cardRepository = cardRepository;
        this.categoryRepository = categoryRepository;
        this.cardDiscountRepository = cardDiscountRepository;
        this.userRepository = userRepository;
    }

    //create card with discount
    public void createCard(CreateCardRequest request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found"));

        Card card = new Card();
        card.setCardName(request.getCardName());
        card.setUser(user);

        card = cardRepository.save(card);

        Category category = categoryRepository
                .findByName(request.getCategory())
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(request.getCategory());
                    return categoryRepository.save(newCategory);
                });

        CardDiscount cd = new CardDiscount();
        cd.setCard(card);
        cd.setCategory(category);
        cd.setDiscount(request.getDiscount());

        cardDiscountRepository.save(cd);
    }

    //get user's cards with discount info
    public List<CardResponse> getCardsByUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Card> cards = cardRepository.findByUser(user);

        return cards.stream().map(card -> {

            CardDiscount cd = card.getCardDiscounts().get(0);

            return new CardResponse(
                    card.getId(),
                    card.getCardName(),
                    cd.getCategory().getName(),
                    cd.getDiscount()
            );

        }).toList();
    }

    //update card and discount info
        public void updateCard(Long cardId, UpdateCardRequest request, String email) {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

            Card card = cardRepository.findById(cardId)
                    .orElseThrow(() -> new CardNotFoundException("Card not found"));

            if (!card.getUser().getId().equals(user.getId())) {
                throw new UnauthorizedException("You cannot modify this card");
            }

            // update card name
            card.setCardName(request.getCardName());
            cardRepository.save(card);

            // find or create category
            Category category = categoryRepository
                    .findByName(request.getCategory())
                    .orElseGet(() -> {
                        Category newCategory = new Category();
                        newCategory.setName(request.getCategory());
                        return categoryRepository.save(newCategory);
                    });

            // update discount
            CardDiscount cardDiscount = cardDiscountRepository
                    .findByCard(card)
                    .orElseThrow(() -> new BadRequestException("Card discount not found"));

            cardDiscount.setCategory(category);
            cardDiscount.setDiscount(request.getDiscount());

            cardDiscountRepository.save(cardDiscount);
        }
}

