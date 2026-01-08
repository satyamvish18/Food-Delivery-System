package com.aalperen.Food.Ordering.repository;

import com.aalperen.Food.Ordering.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
