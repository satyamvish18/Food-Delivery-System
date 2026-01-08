package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.Category;
import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.repository.CategoryRepository;
import com.aalperen.Food.Ordering.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RestaurantService restaurantService;


    @Override
    public Category createCategory(String name, Long userId) throws Exception {

        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);
        Category category = new Category();
        category.setName(name);
        category.setRestaurant(restaurant);


        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantByUserId(id);
        return categoryRepository.findByRestaurantId(id);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {

        Optional<Category> opt = categoryRepository.findById(id);

        if (opt.isPresent()) {
            return opt.get();
        }

        throw new Exception("Category not found");
    }
}
