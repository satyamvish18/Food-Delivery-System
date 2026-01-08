package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.config.JwtProvider;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    UserRepository userRepository;


    @Override
    public User findUserByToken(String jwt) throws Exception {

        String email = JwtProvider.getEmailFromToken(jwt);

        User user = userRepository.findByEmail(email);

        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {

        User user = userRepository.findByEmail(email);

        if (user == null){
            throw new Exception("User not found");
        }


        return user;
    }
}
