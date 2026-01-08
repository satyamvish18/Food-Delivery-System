import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./actionType"
import { api } from "../../Config/api";

export const createMenuItem = ({menu,token}) => {
    return async (dispatch) => {
        dispatch({type:CREATE_MENU_ITEM_SUCCESS})

        try {
            const {data} = await api.post("/api/admin/foods",menu,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log("Created menu", data)
            dispatch({type:CREATE_MENU_ITEM_SUCCESS, data})
        } catch (error) {
            console.log(error);
            dispatch({type:CREATE_MENU_ITEM_FAILURE, error})
            
        }
    }
}

export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST})
        

        try {
            const {data} = await api.get(`/api/foods/restaurant/${reqData.restaurantId}?isVegetarian=${reqData.vegetarian}&isNonVegetarian=${reqData.nonveg}&isSeasonal=${reqData.seasonal}&foodCategory=${reqData.foodCategory}`,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                }
            })


            console.log("Menu items", data)
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload:data})
        } catch (error) {
            console.log(error);
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload:error})
            
        }
    }
}

export const findMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST})
        

        try {
            const {data} = await api.get(`/api/foods/restaurant-id/${reqData.restaurantId}`,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                }
            })


            console.log("Menu items by restaurantId", data)
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload:data})
        } catch (error) {
            console.log(error);
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload:error})
            
        }
    }
}

export const searchMenuItme = ({keyword, token}) => {
    return async (dispatch) => {
        dispatch({type:SEARCH_MENU_ITEM_REQUEST})

        try {
            const {data} = await api.get(`/api/food/search?name=${keyword}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log("Search items", data)
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS, payload:data})
        } catch (error) {
            console.log(error);
            dispatch({type:SEARCH_MENU_ITEM_FAILURE, payload:error})
            
        }
    }
}

/*export const getAllIngredientsOfMenuItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_})

        try {
            const {data} = await api.get(`/api/restaurant/${reqData.restaurantId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log("Menu item by restaurants", data)
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS, data})
        } catch (error) {
            console.log(error);
            dispatch({type:SEARCH_MENU_ITEM_FAILURE, error})
            
        }
    }
}*/

export const updateMenuItemAvalibility = ({foodId, token}) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST})

        try {
            const {data} = await api.put(`/api/admin/food/${foodId}`,{},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log("Update menu item avalibility", data)
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,payload:data})
        } catch (error) {
            console.log(error);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload:error})
            
        }
    }
}

export const deleteFood = ({foodId, token}) => {
    return async (dispatch) => {
        dispatch({type:DELETE_MENU_ITEM_REQUEST})

        try {
            const {data} = await api.delete(`/api/admin/foods/${foodId}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            console.log("Deleted menu item successfully", data)
            dispatch({type:DELETE_MENU_ITEM_SUCCESS, payload:foodId})
        } catch (error) {
            console.log(error);
            dispatch({type:DELETE_MENU_ITEM_FAILURE, payload:error})
            
        }
    }
}