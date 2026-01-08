package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.dto.RestaurantDto;
import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {

    Restaurant createRestaurant(CreateRestaurantRequest req, User user);

    Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception;

    void deleteRestaurant(Long restaurantId) throws Exception;

    List<Restaurant> getAllRestaurants();

    Restaurant getRestaurantById(Long id) throws Exception;

    List<Restaurant> searchRestaurant(String keyword);

    Restaurant getRestaurantByUserId(Long userId) throws Exception;

    RestaurantDto addToFavorites(Long restaurantId, User useer)throws Exception;

   Restaurant updateRestaurantStatus(Long restaurantId)throws Exception;
}
