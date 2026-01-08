package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.Order;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.request.OrderRequest;

import java.util.List;

public interface OrderService {

    Order createOrder(OrderRequest req, User user) throws Exception;

    Order updateOrder(Long orderId, String orderStatus) throws Exception;

    void deleteOrder(Long orderId)throws Exception;

    List<Order> getUsersOrder(Long userId)throws Exception;

    List<Order> getRestaurantOrders(Long restaurantId, String orderStatus)throws Exception;

    Order findOrderById(Long orderId)throws Exception;
}
