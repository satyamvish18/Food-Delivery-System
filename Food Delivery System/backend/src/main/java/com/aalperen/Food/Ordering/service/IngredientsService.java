package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.IngredientsCategory;
import com.aalperen.Food.Ordering.entity.IngredientsItem;

import java.util.List;

public interface IngredientsService {

    IngredientsCategory createIngredientsCategory(String name, Long restaurantId) throws Exception;

    IngredientsCategory findIngredientsCategoryById(Long id) throws Exception;

    List<IngredientsCategory> findAllIngredientsCategoryByRestaurantId(Long restaurantId) throws Exception;

    IngredientsItem createIngredientsItem(Long restaurantId, String ingredientsName, Long categoryId) throws Exception;

    List<IngredientsItem> findRestaurantIngredients(Long restaurantId) throws Exception;

    IngredientsItem updateStock(Long id) throws Exception;
}
