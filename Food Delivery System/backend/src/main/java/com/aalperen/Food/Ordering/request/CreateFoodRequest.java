package com.aalperen.Food.Ordering.request;

import com.aalperen.Food.Ordering.entity.Category;
import com.aalperen.Food.Ordering.entity.IngredientsItem;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class CreateFoodRequest {

    private String name;

    private String description;

    private Long price;

    private Category category;

    private List<String> images;

    private Long restaurantId;

    private boolean isVegetarian;

    private boolean isSeasonal;

    private List<IngredientsItem> ingredients;


}
