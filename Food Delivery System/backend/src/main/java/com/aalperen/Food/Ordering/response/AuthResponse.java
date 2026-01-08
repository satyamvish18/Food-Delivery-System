package com.aalperen.Food.Ordering.response;

import com.aalperen.Food.Ordering.enums.Role;
import lombok.Data;

@Data
public class AuthResponse {

    private String token;

    private String message;

    private Role role;
}
