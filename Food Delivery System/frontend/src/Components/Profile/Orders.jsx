import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder } from "../State/Order/action";

export const Orders = () => {
  const { card, auth, order } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrder(token));
  }, [auth.token]);
  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
        {order.orders.map((order) =>
          order.items.map((item) => <OrderCard order={order} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Orders;
