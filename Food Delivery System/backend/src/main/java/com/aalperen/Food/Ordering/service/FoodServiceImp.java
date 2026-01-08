package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.Category;
import com.aalperen.Food.Ordering.entity.Food;
import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.repository.FoodRepository;
import com.aalperen.Food.Ordering.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImp implements FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private RestaurantService  restaurantService;

    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {

        Food food = new Food();
        food.setCategory(category);
        food.setRestaurant(restaurant);
        food.setName(req.getName());
        food.setDescription(req.getDescription());
        food.setPrice(req.getPrice());
        food.setImage(req.getImages());
        food.setIngredients(req.getIngredients());
        food.setVegetarian(req.isVegetarian());
        food.setSeasonal(req.isSeasonal());

        Food savedFood = foodRepository.save(food);
        restaurant.getFoods().add(savedFood);

        return savedFood;
    }

    @Override
    public void deleteFood(Long foodId) throws Exception {

        Food foundFood = findFoodById(foodId);
        foundFood.setRestaurant(null);
        foodRepository.save(foundFood);

    }

    @Override
    public List<Food> getRestaurantFoods(Long restaurantId, boolean isVegetarian, boolean isNonVegetarian,
                                         boolean isSeasonal, String foodCategory) {
        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        if (isNonVegetarian){
            foods = filterByVegetarian(foods, isVegetarian);
        }

        if (isNonVegetarian){
            foods = filterByNonVegetarian(foods,isNonVegetarian);

        }

        if (isSeasonal){
            foods = filterBySeasonal(foods, isSeasonal);
        }

        if (foodCategory != null && !foodCategory.equals("")) {
            foods = filterByCategory(foods, foodCategory);
        }

        return foods;
    }

    @Override
    public List<Food> getRestaurantFoodsByRestaurantId(Long restaurantId) {
        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        return foods;
    }

    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter(food -> {
            if (food.getCategory() != null) {
                return food.getCategory().getName().equals(foodCategory);
            }
            return false;
        }).collect(Collectors.toList());
    }

    private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {
        return foods.stream().filter(food -> food.isSeasonal() == isSeasonal).collect(Collectors.toUnmodifiableList());
    }

    private List<Food> filterByNonVegetarian(List<Food> foods, boolean isNonVegetarian) {
        return foods.stream().filter(food -> food.isVegetarian() == false).collect(Collectors.toUnmodifiableList());
    }

    private List<Food> filterByVegetarian(List<Food> foods, boolean isVegetarian) {

        return foods.stream().filter(food -> food.isVegetarian() == isVegetarian).collect(Collectors.toUnmodifiableList());
    }

    @Override
    public List<Food> searchFood(String keyword) {

        return foodRepository.searchFood(keyword);
    }

    @Override
    public Food findFoodById(Long id) throws Exception {

        Optional<Food> opt = foodRepository.findById(id);

        if (opt.isEmpty()){
            throw new Exception("Food not found");
        }else{
            return opt.get();
        }
    }

    @Override
    public Food updateAvaliablitity(Long foodId) throws Exception {

        Food food = findFoodById(foodId);

        if (food.isAvailable()){
            food.setAvailable(false);
        }else{
            food.setAvailable(true);
        }

        return foodRepository.save(food);
    }
}
