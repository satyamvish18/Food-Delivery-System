package com.aalperen.Food.Ordering.controller;

import com.aalperen.Food.Ordering.config.JwtProvider;
import com.aalperen.Food.Ordering.entity.Card;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.enums.Role;
import com.aalperen.Food.Ordering.repository.CardRepository;
import com.aalperen.Food.Ordering.repository.UserRepository;
import com.aalperen.Food.Ordering.request.LoginRequest;
import com.aalperen.Food.Ordering.response.AuthResponse;
import com.aalperen.Food.Ordering.service.CustomerUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerUserDetailsService userDetailsService;

    @Autowired
    private CardRepository cardRepository;


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUser(@RequestBody User user) throws Exception {

        User isEmailExist = userRepository.findByEmail(user.getEmail());

        if(isEmailExist != null){
            throw new Exception("Email is already used another account");
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setAddresses(user.getAddresses());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));


        User savedUser = userRepository.save(createdUser);

        Card card = new Card();
        card.setCustomer(savedUser);
        cardRepository.save(card);


        Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());

        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        AuthResponse  authResponse = new AuthResponse();
        authResponse.setMessage("User created successfully");
        authResponse.setRole(savedUser.getRole());
        authResponse.setToken(jwt);


        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) throws Exception {

        String username = req.getEmail();

        String password = req.getPassword();

        Authentication auth = authetication(username,password);
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();

        String jwt = JwtProvider.generateToken(auth);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Signin request success");
        authResponse.setRole(Role.valueOf(role));
        authResponse.setToken(jwt);

        return new ResponseEntity<>(authResponse, HttpStatus.OK);


    }


    private Authentication authetication(String username, String password) {
        // Kullanıcıyı veritabanından yükleme
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username or password");
        }

        // Şifreyi doğrulama
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        // Kullanıcının yetkileriyle birlikte Authentication oluşturma
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
