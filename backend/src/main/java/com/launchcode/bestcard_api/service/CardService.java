package com.launchcode.bestcard_api.service;


import com.launchcode.bestcard_api.dto.CreateCardRequest;
import com.launchcode.bestcard_api.exception.BadRequestException;
import com.launchcode.bestcard_api.model.Card;
import com.launchcode.bestcard_api.model.CardDiscount;
import com.launchcode.bestcard_api.model.Category;
import com.launchcode.bestcard_api.model.User;
import com.launchcode.bestcard_api.repository.CardDiscountRepository;
import com.launchcode.bestcard_api.repository.CardRepository;
import com.launchcode.bestcard_api.repository.CategoryRepository;
import com.launchcode.bestcard_api.repository.UserRepository;
import org.springframework.stereotype.Service;

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
}

