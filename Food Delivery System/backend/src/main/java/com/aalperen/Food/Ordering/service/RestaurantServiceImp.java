package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.dto.RestaurantDto;
import com.aalperen.Food.Ordering.entity.Address;
import com.aalperen.Food.Ordering.entity.Restaurant;
import com.aalperen.Food.Ordering.entity.User;
import com.aalperen.Food.Ordering.repository.AddressRepository;
import com.aalperen.Food.Ordering.repository.RestaurantRepository;
import com.aalperen.Food.Ordering.repository.UserRepository;
import com.aalperen.Food.Ordering.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantServiceImp implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {

        Address address = addressRepository.save(req.getAddress());

        Restaurant restaurant = new Restaurant();

        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
        restaurant.setDescription(req.getDescription());
        restaurant.setFoodType(req.getFoodType());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return  restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception {

        Restaurant restaurant = getRestaurantById(restaurantId);

        if(restaurant.getFoodType() != null){
            restaurant.setFoodType(updatedRestaurant.getFoodType());
        }
        if(restaurant.getImages() != null){
            restaurant.setImages(updatedRestaurant.getImages());
        }
        if(restaurant.getDescription() != null){
            restaurant.setDescription(updatedRestaurant.getDescription());
        }
        if(restaurant.getOpeningHours() != null){
            restaurant.setOpeningHours(updatedRestaurant.getOpeningHours());
        }
        if(restaurant.getContactInformation() != null){
            restaurant.setContactInformation(updatedRestaurant.getContactInformation());
        }

            restaurant.setOpen(updatedRestaurant.isOpen());


        if (restaurant.getName() != null){
            restaurant.setName(updatedRestaurant.getName());
        }

        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long restaurantId) throws Exception {
        Restaurant restaurant = getRestaurantById(restaurantId);

        restaurantRepository.delete(restaurant);

    }

    @Override
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @Override
    public Restaurant getRestaurantById(Long id) throws Exception {
        Optional<Restaurant> opt = restaurantRepository.findById(id);
        if (opt.isEmpty()){
            throw new Exception("Restaurant not found");
        }
            return opt.get();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {
        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) throws Exception {
       Restaurant restaurant = restaurantRepository.findByOwnerId(userId);

       if(restaurant == null){
           throw new Exception("Restaurant not found");
       }

        return restaurant;
    }

    @Override
    public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {
        Restaurant restaurant = getRestaurantById(restaurantId);

        RestaurantDto dto = new RestaurantDto();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurantId);

        boolean isFavorites = false;

        List<RestaurantDto> favorites = user.getFavorites();

        for (RestaurantDto favorite: favorites){
            if (favorite.getId().equals(restaurantId)){
                isFavorites = true;
                break;
            }
        }

        if (isFavorites){
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        }else{
            favorites.add(dto);
        }

        userRepository.save(user);

        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long restaurantId) throws Exception {

        Restaurant restaurant = getRestaurantById(restaurantId);
        restaurant.setOpen(!restaurant.isOpen());

        return restaurantRepository.save(restaurant);
    }
}
