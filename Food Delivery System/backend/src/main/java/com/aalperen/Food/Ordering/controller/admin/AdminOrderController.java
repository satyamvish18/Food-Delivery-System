package com.aalperen.Food.Ordering.controller.admin;

import com.aalperen.Food.Ordering.entity.Order;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.request.OrderRequest;
import com.aalperen.Food.Ordering.service.OrderService;
import com.aalperen.Food.Ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;


    @GetMapping("/orders/restaurant/{id}")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable Long id,
                                                       @RequestParam(required = false) String orderStatus,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        List<Order> orders = orderService.getRestaurantOrders(id,orderStatus);

        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/orders/{orderId}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId,
                                                       @PathVariable String orderStatus,
                                                       @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByToken(jwt);

        Order order = orderService.updateOrder(orderId,orderStatus);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
