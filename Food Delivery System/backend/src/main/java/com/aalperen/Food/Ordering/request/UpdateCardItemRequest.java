package com.aalperen.Food.Ordering.request;

import lombok.Data;

@Data
public class UpdateCardItemRequest {

    private Long cardItemId;

    private int quantity;
}
