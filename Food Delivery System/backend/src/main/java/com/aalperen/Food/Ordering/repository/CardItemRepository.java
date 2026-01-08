package com.aalperen.Food.Ordering.repository;

import com.aalperen.Food.Ordering.entity.CardItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardItemRepository extends JpaRepository<CardItem, Long> {
}
