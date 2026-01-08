package com.aalperen.Food.Ordering.response;


import lombok.Data;
import org.springframework.stereotype.Service;

@Data
public class PaymentResponse {
    private String payment_url;
}
