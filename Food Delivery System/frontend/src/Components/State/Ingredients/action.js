
import { api } from "../../Config/api";
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, GET_INGREDIENTS, UPDATE_STOCK } from "./actionType";

export const getIngredientOfRestaurant =({id, token}) => {
    return async(dispatch) => {
        try {

            const res = await api.get(`/api/admin/ingredients/restaurant/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("Get all ingredients ",res.data)
            dispatch({type:GET_INGREDIENTS, payload:res.data})
        } catch (error) {
            console.log(error)
        }
    }
}

export const createIngredient =({data, token}) => {
    return async(dispatch) => {
        dispatch({type:CREATE_INGREDIENT_REQUEST})
        try {

            const res = await api.post(`/api/admin/ingredients`,data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("Create ingredients ",res.data)
            dispatch({type:CREATE_INGREDIENT_SUCCESS, payload:res.data})
        } catch (error) {
            dispatch({type:CREATE_INGREDIENT_FAILURE, payload:error})
            console.log(error)
        }
    }
}

export const createIngredientCategory =({data, token}) => {
    return async(dispatch) => {
        dispatch({type:CREATE_INGREDIENT_CATEGORY_REQUEST})
        try {

            const res = await api.post(`/api/admin/ingredients/category`,data,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("CreateIngredientCategory ",res.data)
            dispatch({type:CREATE_INGREDIENT_CATEGORY_SUCCESS, payload:res.data})
        } catch (error) {
            dispatch({type:CREATE_INGREDIENT_CATEGORY_FAILURE, payload:error})
            console.log(error)
        }
    }
}

export const getIngredientCategory =({id, token}) => {
    return async(dispatch) => {
        dispatch({type:GET_INGREDIENT_CATEGORY_REQUEST})
        try {

            const res = await api.get(`/api/admin/ingredients/restaurant/${id}/category`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("GetIngredientCategory ",res.data)
            dispatch({type:GET_INGREDIENT_CATEGORY_SUCCESS, payload:res.data})
        } catch (error) {
            dispatch({type:GET_INGREDIENT_CATEGORY_FAILURE, payload:error})
            console.log(error)
        }
    }
}

export const updateStockOfIngredients =({id, token}) => {
    return async(dispatch) => {
        
        try {

            const {data} = await api.put(`/api/admin/ingredients/${id}/stock`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log("updateStock ",data)
            dispatch({type:UPDATE_STOCK, payload:data})
        } catch (error) {
            console.log(error)
        }
    }
}