package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.IngredientsCategory;
import com.aalperen.Food.Ordering.entity.IngredientsItem;
import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.repository.IngredientsCategoryRepository;
import com.aalperen.Food.Ordering.repository.IngredientsItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientsServiceImp implements IngredientsService {

    @Autowired
    private IngredientsItemRepository ingredientsItemRepository;

    @Autowired
    private IngredientsCategoryRepository ingredientsCategoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public IngredientsCategory createIngredientsCategory(String name, Long restaurantId) throws Exception {

        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);

        IngredientsCategory ingredientsCategory = new IngredientsCategory();
        ingredientsCategory.setName(name);
        ingredientsCategory.setRestaurant(restaurant);

        return ingredientsCategoryRepository.save(ingredientsCategory);
    }

    @Override
    public IngredientsCategory findIngredientsCategoryById(Long id) throws Exception {

        Optional<IngredientsCategory> opt = ingredientsCategoryRepository.findById(id);

        if (opt.isPresent()) {
            return opt.get();
        }

        throw new Exception("Ingredient category not found");
    }

    @Override
    public List<IngredientsCategory> findAllIngredientsCategoryByRestaurantId(Long restaurantId) throws Exception {
        restaurantService.getRestaurantById(restaurantId);
        return ingredientsCategoryRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem createIngredientsItem(Long restaurantId, String ingredientsName, Long categoryId) throws Exception {

        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);

        IngredientsCategory ingredientsCategory = findIngredientsCategoryById(categoryId);

        IngredientsItem ingredientsItem = new IngredientsItem();
        ingredientsItem.setRestaurant(restaurant);
        ingredientsItem.setName(ingredientsName);
        ingredientsItem.setCategory(ingredientsCategory);

        IngredientsItem ingredientsItemSaved = ingredientsItemRepository.save(ingredientsItem);
        ingredientsCategory.getIngredients().add(ingredientsItemSaved);
        return ingredientsItemSaved;
    }

    @Override
    public List<IngredientsItem> findRestaurantIngredients(Long restaurantId) throws Exception {
        return ingredientsItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem updateStock(Long id) throws Exception {

        Optional<IngredientsItem> opt = ingredientsItemRepository.findById(id);

        if (opt.isEmpty()) {
            throw new Exception("Ingredient item not found");
        }

        IngredientsItem ingredientsItem = opt.get();
        ingredientsItem.setInStoke(!ingredientsItem.isInStoke());

        return ingredientsItemRepository.save(ingredientsItem);

    }
}
