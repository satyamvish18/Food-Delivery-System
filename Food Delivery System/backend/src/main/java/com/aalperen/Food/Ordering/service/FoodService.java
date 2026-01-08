package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.Category;
import com.aalperen.Food.Ordering.entity.Food;
import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

    Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant);

    void deleteFood(Long foodId) throws Exception;

    List<Food> getRestaurantFoods(Long restaurantId, boolean isVegetarian,boolean isNonVegetarian, boolean isSeasonal, String foodCategory);

    List<Food> getRestaurantFoodsByRestaurantId(Long restaurantId);

    List<Food> searchFood(String keyword);

    Food findFoodById(Long id) throws Exception;

    Food updateAvaliablitity(Long foodId) throws Exception;



}
