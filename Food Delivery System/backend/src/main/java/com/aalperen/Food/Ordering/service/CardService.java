package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.Card;
import com.aalperen.Food.Ordering.entity.CardItem;
import com.aalperen.Food.Ordering.request.AddCardItemRequest;

public interface CardService {

    CardItem addItemToChart(AddCardItemRequest req, String jwt)throws Exception;

    CardItem updateCardItemQuantity(Long cardItemId,int quantity)throws Exception;

    Card removeItemFromCard(Long cardItemId, String jwt)throws Exception;

    Long calculateCardTotal(Card card) throws Exception;

    Card findCardById(Long id)throws Exception;

    Card findCardByUserId(Long userId)throws Exception;

    Card clearCard(Long userId)throws Exception;
}
