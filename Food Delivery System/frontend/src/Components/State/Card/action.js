import { ADD_ITEM_TO_CARD_FAILURE, ADD_ITEM_TO_CARD_REQUEST, ADD_ITEM_TO_CARD_SUCCESS, CLEAR_CARD_FAILURE, CLEAR_CARD_REQUEST, CLEAR_CARD_SUCCESS, FIND_CARD_FAILURE, FIND_CARD_REQUEST, FIND_CARD_SUCCESS, GET_ALL_CARD_ITEMS_FAILURE, GET_ALL_CARD_ITEMS_REQUEST, GET_ALL_CARD_ITEMS_SUCCESS, REMOVE_CARD_ITEM_FAILURE, REMOVE_CARD_ITEM_REQUEST, REMOVE_CARD_ITEM_SUCCESS, UPDATE_CARD_ITEM_FAILURE, UPDATE_CARD_ITEM_REQUEST, UPDATE_CARD_ITEM_SUCCESS } from "./actionType"
import { api } from "../../Config/api";


export const findCard = (token) => {
    return async (dispatch) => {
        dispatch({type:FIND_CARD_REQUEST})

        try {
            const response = await api.get(`/api/card`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            dispatch({type:FIND_CARD_SUCCESS, payload:response.data})
            console.log("User's card",response.data)
        } catch (error) {
            dispatch({type:FIND_CARD_FAILURE, error})
            console.log(error)
            
        }
    }

}

export const getAllCardItems = (reqData) => {
    return async (dispatch) => {
        dispatch({type:GET_ALL_CARD_ITEMS_REQUEST})

        try {
            const response = await api.get(`/api/cards/${reqData.cardId}/items`,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                }
            })

            dispatch({type:GET_ALL_CARD_ITEMS_SUCCESS, payload:response.data})
            console.log("Get all cards",response.data)
        } catch (error) {
            dispatch({type:GET_ALL_CARD_ITEMS_FAILURE, error})
            console.log(error)
            
        }
    }

}

export const addItemToCard = (reqData) => {
    return async (dispatch) => {
        dispatch({type:ADD_ITEM_TO_CARD_REQUEST})

        try {
            const response = await api.put(`/api/card/add`,reqData.cardItem,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                }
            })

            dispatch({type:ADD_ITEM_TO_CARD_SUCCESS, payload:response.data})
            console.log("Add item to card",response.data)
        } catch (error) {
            dispatch({type:ADD_ITEM_TO_CARD_FAILURE, error})
            console.log(error)
            
        }
    }

}
/*
export const updateCardItem = (reqData) => {
    return async (dispatch) => {
        dispatch({type:UPDATE_CARD_ITEM_REQUEST})

        try {
            const {response} = await api.put(`/api/card-item/update`,reqData.data,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                }
            })

            dispatch({type:UPDATE_CARD_ITEM_SUCCESS, payload:response})
            console.log("Updata card item ",response)
        } catch (error) {
            dispatch({type:UPDATE_CARD_ITEM_FAILURE, error})
            console.log(error)
            
        }
    }

}*/
export const updateCardItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CARD_ITEM_REQUEST });

        try {
            // Destructuring yaparken { data } kullanıyoruz
            const { data } = await api.put(`/api/card-item/update`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`
                }
            });

            dispatch({ type: UPDATE_CARD_ITEM_SUCCESS, payload: data });
            console.log("Update card item:", data);
        } catch (error) {
            dispatch({ type: UPDATE_CARD_ITEM_FAILURE, error });
            console.log("Error:", error.response ? error.response.data : error.message);
        }
    };
};


export const removeCardItme = ({cardItemId,reqData}) => {
    return async (dispatch) => {
        dispatch({type:REMOVE_CARD_ITEM_REQUEST})

        try {
            const {response} = await api.delete(`/api/card-item/${cardItemId}/remove`,reqData.data,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                }
            })

            dispatch({type:REMOVE_CARD_ITEM_SUCCESS, payload:response})
            console.log("Remove card item ",response)
        } catch (error) {
            dispatch({type:REMOVE_CARD_ITEM_FAILURE, error})
            console.log(error)
            
        }
    }

}
//????????????
export const clearCard = () => {
    return async (dispatch) => {
        dispatch({type:CLEAR_CARD_REQUEST})

        try {
            const {response} = await api.put(`/api/card/clear`,{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })

            dispatch({type:CLEAR_CARD_SUCCESS, payload:response})
            console.log("Clear card",response)
        } catch (error) {
            dispatch({type:CLEAR_CARD_FAILURE, error})
            console.log(error)
            
        }
    }

}