package com.aalperen.Food.Ordering.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;


@Data
public class ContactInformation {
    private String email;

    private String phone;

    private String twitter;

    private String instagram;
}
