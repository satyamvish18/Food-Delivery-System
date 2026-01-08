package com.aalperen.Food.Ordering.controller;

import com.aalperen.Food.Ordering.entity.Food;
import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.request.CreateFoodRequest;
import com.aalperen.Food.Ordering.service.FoodService;
import com.aalperen.Food.Ordering.service.RestaurantService;
import com.aalperen.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;


    @GetMapping("/foods/{id}")
    public ResponseEntity<Food> findFoodByID(@PathVariable Long id,
                                             @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);
        Food food = foodService.findFoodById(id);

        return new ResponseEntity<>(food, HttpStatus.OK);
    }

    @GetMapping("/foods/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String keyword,
                                             @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);
        List<Food> foods = foodService.searchFood(keyword);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/foods/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> findRestaurantFoods(@PathVariable Long restaurantId,
                                                 @RequestParam (required = false)boolean isVegetarian,
                                                 @RequestParam (required = false)boolean isNonVegetarian,
                                                 @RequestParam (required = false)boolean isSeasonal,
                                                 @RequestParam(required = false) String foodCategory,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);
        List<Food> foods = foodService.getRestaurantFoods(restaurantId,isVegetarian,isNonVegetarian,isSeasonal,foodCategory);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }

    @GetMapping("/foods/restaurant-id/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFoods(@PathVariable Long restaurantId,
                                                         @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);
        List<Food> foods = foodService.getRestaurantFoodsByRestaurantId(restaurantId);

        return new ResponseEntity<>(foods, HttpStatus.OK);
    }
}
