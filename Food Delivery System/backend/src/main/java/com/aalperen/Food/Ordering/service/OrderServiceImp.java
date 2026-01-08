package com.aalperen.Food.Ordering.service;

import com.aalperen.Food.Ordering.entity.*;
import com.aalperen.Food.Ordering.repository.*;
import com.aalperen.Food.Ordering.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CardService cardService;


    @Override
    public Order createOrder(OrderRequest req, User user) throws Exception {

        Address shippAddress = req.getDeliveryAddress();

        Address savedAddress = addressRepository.save(shippAddress);

        if(!user.getAddresses().contains(savedAddress)){
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }

        Restaurant restaurant = restaurantService.getRestaurantById(req.getRestaurantId());

        Order createdOrder = new Order();
        createdOrder.setDeliveryAddress(shippAddress);
        createdOrder.setCustomer(user);
        createdOrder.setCreateAt(new Date());
        createdOrder.setOrderStatus("PENDING");
        createdOrder.setRestaurant(restaurant);

        Card card = cardService.findCardByUserId(user.getId());

        List<OrderItem> orderItems = new ArrayList<>();

        for (CardItem item: card.getItems()){
            OrderItem orderItem = new OrderItem();
            orderItem.setFood(item.getFood());
            orderItem.setIngredients(item.getIngredients());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setTotalPrice(item.getTotalPrice());

            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
        }

        Long totalPrice = cardService.calculateCardTotal(card);

        createdOrder.setItems(orderItems);
        createdOrder.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(createdOrder);
        restaurant.getOrders().add(savedOrder);




        return createdOrder;
    }

    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {

        Order order = findOrderById(orderId);

        if (orderStatus.equals("OUT_FOR_DELIVERY")  ||
                orderStatus.equals("DELIVERED") ||
                orderStatus.equals("COMPLETED") ||
        orderStatus.equals("PENDING")){

            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        }


        throw new Exception("Order can not be updated");
    }

    @Override
    public void deleteOrder(Long orderId) throws Exception {

        Order order = findOrderById(orderId);
        orderRepository.deleteById(order.getId());

    }

    @Override
    public List<Order> getUsersOrder(Long userId) throws Exception {
        return orderRepository.findOrdersByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception {

        List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

        if (orderStatus != null){
            orders = orders.stream().filter(order ->
                    order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
        }

        return orders;
    }

    @Override
    public Order findOrderById(Long orderId) throws Exception {

        Optional<Order> order = orderRepository.findById(orderId);

        if (order.isEmpty()){
            throw new Exception("Order not found");
        }

        return order.get();
    }
}
