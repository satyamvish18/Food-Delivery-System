package com.aalperen.Food.Ordering.controller;

import com.aalperen.Food.Ordering.dto.RestaurantDto;
import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.request.CreateRestaurantRequest;
import com.aalperen.Food.Ordering.service.RestaurantService;
import com.aalperen.Food.Ordering.service.UserService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;


    @GetMapping("/restaurants/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(@RequestParam String keyword,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        List<Restaurant> restaurants = restaurantService.searchRestaurant(keyword);


        return new ResponseEntity<>(restaurants, HttpStatus.OK);

    }

    @GetMapping("/restaurants")
    public ResponseEntity<List<Restaurant>> getAllRestaurants(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        List<Restaurant> restaurants = restaurantService.getAllRestaurants();


        return new ResponseEntity<>(restaurants, HttpStatus.OK);

    }

    @GetMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> getAllRestaurants(@RequestHeader("Authorization") String jwt,
                                                              @PathVariable Long id) throws Exception {

        User user = userService.findUserByToken(jwt);

        Restaurant restaurant = restaurantService.getRestaurantById(id);


        return new ResponseEntity<>(restaurant, HttpStatus.OK);

    }

    @PutMapping("/restaurants/{id}/add-favorites")
    public ResponseEntity<RestaurantDto> addToFavorites(@RequestHeader("Authorization") String jwt,
                                                        @PathVariable Long id) throws Exception {

        User user = userService.findUserByToken(jwt);

        RestaurantDto restaurant =  restaurantService.addToFavorites(id,user);




        return new ResponseEntity<>(restaurant, HttpStatus.OK);

    }
}
