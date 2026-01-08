package com.aalperen.Food.Ordering.controller.admin;

import com.aalperen.Food.Ordering.entity.Food;
import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.request.CreateFoodRequest;
import com.aalperen.Food.Ordering.response.MessageResponse;
import com.aalperen.Food.Ordering.service.FoodService;
import com.aalperen.Food.Ordering.service.RestaurantService;
import com.aalperen.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;


    @PostMapping("/foods")
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);
        Restaurant restaurant = restaurantService.getRestaurantById(req.getRestaurantId());
        Food food = foodService.createFood(req, req.getCategory(), restaurant);

        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/foods/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);
        foodService.deleteFood(id);

        MessageResponse res = new MessageResponse();
        res.setMessage("Food deleted successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/foods/{id}")
    public ResponseEntity<Food> updateAvalibility(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);
        Food food = foodService.updateAvaliablitity(id);


        return new ResponseEntity<>(food, HttpStatus.OK);
    }


}
