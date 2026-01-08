import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_NOTIFICATION_FAILURE, GET_USERS_NOTIFICATION_REQUEST, GET_USERS_NOTIFICATION_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./actionType"
import {api} from "../../Config/api"

export const createOrder = (orderData) => {
    return async (dispatch) => {
        dispatch({type:CREATE_ORDER_REQUEST})

        try {
            const {data} = await api.post("/api/orders",orderData.order,{
                headers:{
                    Authorization:`Bearer ${orderData.token}`
                }
            })

            if(data.payment_url){
                window.location.href = data.payment_url;
            }

            console.log("Order created",data)
            dispatch({type:CREATE_ORDER_SUCCESS, payload:data})

        } catch (error) {
            console.log(error)
            dispatch({type:CREATE_ORDER_FAILURE, payload:error})
        }
    }
}

export const getUserOrder = (token) => {
    return async (dispatch) => {
        dispatch({type:GET_USERS_ORDERS_REQUEST})

        try {
            const {data} = await api.get("/api/orders/user",{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log("Users order",data)
            dispatch({type:GET_USERS_ORDERS_SUCCESS, payload:data})

        } catch (error) {
            console.log(error)
            dispatch({type:GET_USERS_ORDERS_FAILURE, payload:error})
        }
    }
}

export const getUserNotification = () => {
    return async (dispatch) => {
        dispatch({type:GET_USERS_NOTIFICATION_REQUEST})

        try {
            const {data} = await api.get("/api/notifications")

            console.log("Users notification",data)
            dispatch({type:GET_USERS_NOTIFICATION_SUCCESS, payload:data})

        } catch (error) {
            console.log(error)
            dispatch({type:GET_USERS_NOTIFICATION_FAILURE, payload:error})
        }
    }
}