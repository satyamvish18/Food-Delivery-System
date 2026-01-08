package com.aalperen.Food.Ordering.controller.admin;

import com.aalperen.Food.Ordering.entity.IngredientsCategory;
import com.aalperen.Food.Ordering.entity.IngredientsItem;
import com.aalperen.Food.Ordering.request.IngredientsCategoryRequest;
import com.aalperen.Food.Ordering.request.IngredientRequest;
import com.aalperen.Food.Ordering.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class IngredientsController {

    @Autowired
    private IngredientsService ingredientsService;

    @PostMapping("/ingredients/category")
    public ResponseEntity<IngredientsCategory> createIngredientsCategory(@RequestBody IngredientsCategoryRequest req) throws Exception {

        IngredientsCategory category = ingredientsService.createIngredientsCategory(req.getName(), req.getRestaurantId());



        return new ResponseEntity<>(category, HttpStatus.CREATED);
    }

    @PostMapping("/ingredients")
    public ResponseEntity<IngredientsItem> createIngredientsItem(@RequestBody IngredientRequest req) throws Exception {

        IngredientsItem item = ingredientsService.createIngredientsItem(req.getRestaurantId(),
                req.getName(), req.getCategoryId());



        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/ingredients/{id}/stock")
    public ResponseEntity<IngredientsItem> updateStoke(@PathVariable Long id) throws Exception {

        IngredientsItem item = ingredientsService.updateStock(id);

        return new ResponseEntity<>(item, HttpStatus.OK);
    }


    @GetMapping("/ingredients/restaurant/{id}")
    public ResponseEntity<List<IngredientsItem>> getRestaurantIngredient(@PathVariable Long id) throws Exception {

        List<IngredientsItem> items = ingredientsService.findRestaurantIngredients(id);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/ingredients/restaurant/{id}/category")
    public ResponseEntity<List<IngredientsCategory>> getRestaurantIngredientCategory(@PathVariable Long id) throws Exception {

        List<IngredientsCategory> categories = ingredientsService.findAllIngredientsCategoryByRestaurantId(id);

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
