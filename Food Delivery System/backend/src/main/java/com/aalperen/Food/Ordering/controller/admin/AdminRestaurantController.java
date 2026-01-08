package com.aalperen.Food.Ordering.controller.admin;

import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.request.CreateRestaurantRequest;
import com.aalperen.Food.Ordering.response.MessageResponse;
import com.aalperen.Food.Ordering.service.RestaurantService;
import com.aalperen.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminRestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private UserService userService;


    @PostMapping("/restaurants")
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody CreateRestaurantRequest req,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        Restaurant restaurant = restaurantService.createRestaurant(req,user);


        return new ResponseEntity<>(restaurant, HttpStatus.CREATED);

    }

    @PutMapping("/restaurants/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@RequestBody CreateRestaurantRequest req,
                                                       @RequestHeader("Authorization") String jwt,
                                                       @PathVariable Long id) throws Exception {

        User user = userService.findUserByToken(jwt);

        Restaurant restaurant = restaurantService.updateRestaurant(id,req);


        return new ResponseEntity<>(restaurant, HttpStatus.OK);

    }


    @DeleteMapping("/restaurants/{id}")
    public ResponseEntity<MessageResponse> deleteRestaurant(@RequestHeader("Authorization") String jwt,
                                                            @PathVariable Long id) throws Exception {

        User user = userService.findUserByToken(jwt);

        restaurantService.deleteRestaurant(id);

        MessageResponse res = new MessageResponse();
        res.setMessage("Restaurant deleted successfully "+ id);

        return new ResponseEntity<>(res, HttpStatus.OK);

    }

    @PutMapping("/restaurants/{id}/status")
    public ResponseEntity<Restaurant> updateRestaurantStatus(@RequestHeader("Authorization") String jwt,
                                                            @PathVariable Long id) throws Exception {

        User user = userService.findUserByToken(jwt);

        Restaurant restaurant = restaurantService.updateRestaurantStatus(id);



        return new ResponseEntity<>(restaurant, HttpStatus.OK);

    }

    @GetMapping("/restaurants/user")
    public ResponseEntity<Restaurant> findRestaurantByUserId(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        Restaurant restaurant = restaurantService.getRestaurantByUserId(user.getId());



        return new ResponseEntity<>(restaurant, HttpStatus.OK);

    }

}
