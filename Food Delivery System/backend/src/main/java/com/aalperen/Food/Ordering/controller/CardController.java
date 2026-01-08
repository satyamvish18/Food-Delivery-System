package com.aalperen.Food.Ordering.controller;

import com.aalperen.Food.Ordering.entity.Card;
import com.aalperen.Food.Ordering.entity.CardItem;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.request.AddCardItemRequest;
import com.aalperen.Food.Ordering.request.UpdateCardItemRequest;
import com.aalperen.Food.Ordering.service.CardService;
import com.aalperen.Food.Ordering.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CardController {

    @Autowired
    private CardService cardService;

    @Autowired
    private UserService userService;


    @PutMapping("/card/add")
    public ResponseEntity<CardItem> addItemToChart(@RequestBody AddCardItemRequest req,
                                                   @RequestHeader("Authorization") String token) throws Exception {

        CardItem item = cardService.addItemToChart(req,token);

        return new ResponseEntity<>(item, HttpStatus.CREATED);

    }


    @PutMapping("/card-item/update")
    public ResponseEntity<CardItem> updateCardItemQuantity(@RequestBody UpdateCardItemRequest req,
                                                   @RequestHeader("Authorization") String token) throws Exception {

        CardItem item = cardService.updateCardItemQuantity(req.getCardItemId(), req.getQuantity());

        return new ResponseEntity<>(item, HttpStatus.OK);

    }

    @DeleteMapping("/card-item/{id}/remove")
    public ResponseEntity<Card> removeCardItem(@PathVariable Long id,
                                               @RequestHeader("Authorization") String token) throws Exception {

        Card card = cardService.removeItemFromCard(id, token);

        return new ResponseEntity<>(card, HttpStatus.OK);

    }


    @PutMapping("/card/clear")
    public ResponseEntity<Card> clearCard(@RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserByToken(token);
        Card card = cardService.clearCard(user.getId());

        return new ResponseEntity<>(card, HttpStatus.OK);

    }

    @GetMapping("/card/{id}")
    public ResponseEntity<Card> getCardById(@PathVariable Long id,@RequestHeader("Authorization") String token) throws Exception {

        Card card = cardService.findCardById(id);

        return new ResponseEntity<>(card, HttpStatus.OK);

    }

    @GetMapping("/card")
    public ResponseEntity<Card> getUserCard(@RequestHeader("Authorization") String token) throws Exception {

        User user = userService.findUserByToken(token);
        Card card = cardService.findCardByUserId(user.getId());

        return new ResponseEntity<>(card, HttpStatus.OK);

    }
}
