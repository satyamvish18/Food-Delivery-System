package com.aalperen.Food.Ordering.repository;

import com.aalperen.Food.Ordering.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {

    Card findByCustomerId(Long userId);
}
