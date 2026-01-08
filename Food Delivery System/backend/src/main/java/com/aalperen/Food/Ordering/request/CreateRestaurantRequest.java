package com.aalperen.Food.Ordering.request;

import com.aalperen.Food.Ordering.entity.Address;
import com.aalperen.Food.Ordering.entity.ContactInformation;
import lombok.Data;

import java.util.List;

@Data
public class CreateRestaurantRequest {

    private Long id;

    private String name;

    private String description;

    private String foodType;

    private Address address;

    private ContactInformation contactInformation;

    private String openingHours;

    private List<String> images;

    private boolean open;
}
