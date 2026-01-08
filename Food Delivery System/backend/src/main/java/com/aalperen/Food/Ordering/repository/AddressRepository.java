package com.aalperen.Food.Ordering.repository;

import com.aalperen.Food.Ordering.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
