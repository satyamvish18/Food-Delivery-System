package com.aalperen.Food.Ordering.request;

import com.aalperen.Food.Ordering.entity.Address;
import lombok.Data;

@Data
public class OrderRequest {

    private Long restaurantId;

    private Address deliveryAddress;


}
