package com.aalperen.Food.Ordering.controller;

import com.aalperen.Food.Ordering.entity.Order;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.request.OrderRequest;
import com.aalperen.Food.Ordering.response.PaymentResponse;
import com.aalperen.Food.Ordering.service.OrderService;
import com.aalperen.Food.Ordering.service.PaymentService;
import com.aalperen.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/orders")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderRequest req, @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        Order order = orderService.createOrder(req, user);

        PaymentResponse paymentResponse = paymentService.createPaymentLink(order);

        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }


    @GetMapping("/orders/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        List<Order> orders = orderService.getUsersOrder(user.getId());

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }
}
