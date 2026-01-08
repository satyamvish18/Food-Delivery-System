import { GET_RESTAURANTS_ORDER_FAILURE, GET_RESTAURANTS_ORDER_REQUEST, GET_RESTAURANTS_ORDER_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./actionType"
import {api} from "../../Config/api"

export const updateOrderStatus = ({orderId,orderStatus,token}) => {
    return async (dispatch) => {
        try {
            dispatch({type:UPDATE_ORDER_STATUS_REQUEST})

            const {data} = await api.put(`/api/admin/orders/${orderId}/${orderStatus}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log("updateOrderStatus",data)
            dispatch({type:UPDATE_ORDER_STATUS_SUCCESS, payload:data})
        } catch (error) {
            console.log(error);
            dispatch({type:UPDATE_ORDER_STATUS_FAILURE,payload:error})
        }
    }
}

export const fetchRestaurantOrders = ({restaurantId,orderStatus,token}) => {
    return async (dispatch) => {
        try {
            dispatch({type:GET_RESTAURANTS_ORDER_REQUEST})

            const {data} = await api.get(`/api/admin/orders/restaurant/${restaurantId}`,{
                params: { order_status:orderStatus},
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log("fetchRestaurantOrders",data)
            dispatch({type:GET_RESTAURANTS_ORDER_SUCCESS, payload:data})
        } catch (error) {
            console.log(error);
            dispatch({type:GET_RESTAURANTS_ORDER_FAILURE,payload:error})
        }
    }
}