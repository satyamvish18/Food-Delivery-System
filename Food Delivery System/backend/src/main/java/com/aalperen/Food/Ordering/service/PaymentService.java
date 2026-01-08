package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.Order;
import com.aalperen.Food.Ordering.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentResponse createPaymentLink(Order order) throws StripeException;
}
