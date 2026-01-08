import React, { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { Orders } from "../Orders/Orders";
import {Menu} from "../Menu/Menu"
import {Category} from "../Category/Category"
import {Ingredients} from "../Ingredients/Ingredients"
import {Event} from "../Event/Event"
import {Details} from "../Details/Details"
import {RestaurantDetails} from "../Admin/RestaurantDetails"
import CreateMenuForm from "../Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById, getRestaurantsCategory } from "../../Components/State/Restaurant/action";
import { getMenuItemsByRestaurantId } from "../../Components/State/Menu/action";
import { getUserOrder } from "../../Components/State/Order/action";
import { fetchRestaurantOrders } from "../../Components/State/RestaurantOrder/action";

export const Admin = () => {
  const dispatch = useDispatch()
  const {restaurant} = useSelector(store=>store)
  const token = localStorage.getItem("token")

  useEffect(()=>{
    dispatch(getRestaurantsCategory({token:token, restaurantId: restaurant.usersRestaurant?.id}))
    dispatch(fetchRestaurantOrders({token:token, restaurantId:restaurant.usersRestaurant?.id}))
    //dispatch(getMenuItemsByRestaurantId())
    //dispatch(getRestaurantById())
    
  },[])


  const handleClose = () => {};
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSidebar handleClose={handleClose} />
        </div>

        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/category" element={<Category/>} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/event" element={<Event />} />
            <Route path="/details" element={<RestaurantDetails />} />
            <Route path="/add-menu" element={<CreateMenuForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
