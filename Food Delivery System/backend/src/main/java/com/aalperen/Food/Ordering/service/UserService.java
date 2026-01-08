package com.aalperen.Food.Ordering.service;


import com.aalperen.Food.Ordering.entity.User;

public interface UserService {

    User findUserByToken(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;


}
