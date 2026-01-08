package com.aalperen.Food.Ordering.repository;

import com.aalperen.Food.Ordering.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


    User findByEmail(String username);


}
