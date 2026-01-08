package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.Card;
import com.aalperen.Food.Ordering.entity.CardItem;
import com.aalperen.Food.Ordering.entity.Food;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.repository.CardItemRepository;
import com.aalperen.Food.Ordering.repository.CardRepository;
import com.aalperen.Food.Ordering.request.AddCardItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CardServiceImp implements CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private CardItemRepository cardItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodService foodService;

    @Override
    public CardItem addItemToChart(AddCardItemRequest req, String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        Food food = foodService.findFoodById(req.getFoodId());

        Card card = cardRepository.findByCustomerId(user.getId());


        for(CardItem cardItem : card.getItems()){
            if(cardItem.getFood().equals(food)){
                int newQuantity = cardItem.getQuantity() + req.getQuantity();
                return updateCardItemQuantity(cardItem.getId(), newQuantity);

            }
        }

        CardItem newItem = new CardItem();
        newItem.setIngredients(req.getIngredients());
        newItem.setQuantity(req.getQuantity());
        newItem.setFood(food);
        newItem.setCard(card);
        newItem.setIngredients(req.getIngredients());
        newItem.setTotalPrice(req.getQuantity()*food.getPrice());

        CardItem savedItem = cardItemRepository.save(newItem);

        card.getItems().add(savedItem);


        return savedItem;
    }

    @Override
    public CardItem updateCardItemQuantity(Long cardItemId, int quantity) throws Exception {

        Optional<CardItem> optItem = cardItemRepository.findById(cardItemId);

        if (optItem.isEmpty()){
            throw new Exception("Card item not found");
        }

        CardItem cardItem = optItem.get();
        cardItem.setQuantity(quantity);
        cardItem.setTotalPrice(cardItem.getFood().getPrice() * quantity);


        return cardItemRepository.save(cardItem);
    }

    @Override
    public Card removeItemFromCard(Long cardItemId, String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        Card card = cardRepository.findByCustomerId(user.getId());

        Optional<CardItem> optItem = cardItemRepository.findById(cardItemId);

        if (optItem.isEmpty()){
            throw new Exception("Card item not found");
        }
        CardItem cardItem = optItem.get();
        card.getItems().remove(cardItem);


        return cardRepository.save(card);
    }

    @Override
    public Long calculateCardTotal(Card card) throws Exception {

        Long total = 0L;

        for (CardItem cardItem : card.getItems()) {
            total += cardItem.getFood().getPrice() * cardItem.getQuantity();
        }
        return total;
    }

    @Override
    public Card findCardById(Long id) throws Exception {
        Optional<Card> optCard = cardRepository.findById(id);

        if (optCard.isEmpty()){
            throw new Exception("Card not found");
        }
        return optCard.get();
    }

    @Override
    public Card findCardByUserId(Long userId) throws Exception {

        //User user = userService.findUserByToken(jwt);

        Card card = cardRepository.findByCustomerId(userId);
        card.setTotal(calculateCardTotal(card));
        return card;
    }

    @Override
    public Card clearCard(Long userId) throws Exception {

        //User user = userService.findUserByToken(jwt);
        Card card = findCardByUserId(userId);

        card.getItems().clear();

        return cardRepository.save(card);
    }
}
