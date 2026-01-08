package com.aalperen.Food.Ordering.request;

import lombok.Data;

@Data
public class IngredientsCategoryRequest {

    private String name;

    private Long restaurantId;
}
