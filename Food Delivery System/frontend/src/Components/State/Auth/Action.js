import axios from "axios"
import { ADD_TO_FAVORITES_FAILURE, ADD_TO_FAVORITES_REQUEST, ADD_TO_FAVORITES_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"
import {api} from "../../Config/api"
import { type } from "@testing-library/user-event/dist/type"

export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})

    try {
        const {data} = await api.post(`/auth/signup`,reqData.userData)

        if(data.token) {
            localStorage.setItem("token",data.token)
        }

        if(data.role === "RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS, payload:data.token})
        console.log("Register success ",data)
        
    } catch (error) {
        dispatch({type:REGISTER_FAILURE, payload:error})
        console.log(error)
        
    }
}

export const login=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})

    try {
        const {data} = await api.post(`/auth/signin`,reqData.userData)

        if(data.token) {
            localStorage.setItem("token",data.token)
        }

        if(data.role === "RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS, payload:data.token})
        console.log("Login success ",data)
        
    } catch (error) {
        dispatch({type:LOGIN_FAILURE, payload:error})
        console.log(error)
        
        
    }
}

export const getUserProfile=(token)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})

    try {
        const {data} = await api.get(`/api/users/profile`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        dispatch({type:GET_USER_SUCCESS, payload:data})
        console.log("user profile",data)
        
    } catch (error) {
        dispatch({type:GET_USER_FAILURE, payload:error})
        console.log(error)
        
    }
}

export const addToFavorite=({token,restaurantId})=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITES_REQUEST})

    try {
        const {data} = await api.put(`/api/restaurants/${restaurantId}/add-favorites`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })

        dispatch({type:ADD_TO_FAVORITES_SUCCESS, payload:data})
        console.log("ADD_TO_FAVORITES_REQUEST SUCCESS",data)
        
    } catch (error) {
        dispatch({type:ADD_TO_FAVORITES_FAILURE, payload:error})
        console.log(error)
        
    }
}
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });

    try {
        // localStorage'daki tüm verileri temizle
        localStorage.clear();

        dispatch({ type: LOGOUT_SUCCESS });
        console.log("Logout SUCCESS");
    } catch (error) {
        dispatch({ type: LOGOUT_FAILURE, payload: error });
        console.error("Logout FAILED:", error);
    }
};
