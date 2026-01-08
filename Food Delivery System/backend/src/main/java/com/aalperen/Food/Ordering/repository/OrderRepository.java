package com.aalperen.Food.Ordering.repository;

import com.aalperen.Food.Ordering.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findOrdersByCustomerId(Long userId);

    List<Order> findByRestaurantId(Long restaurantId);
}
