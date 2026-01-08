import { type } from "@testing-library/user-event/dist/type";
import { api } from "../../Config/api";
import {
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_EVENT_FAILURE,
    CREATE_EVENT_REQUEST,
    CREATE_EVENT_SUCCESS,
    CREATE_RESTAURANT_FAILURE,
    CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENT_FAILURE,
  GET_ALL_EVENT_REQUEST,
  GET_ALL_EVENT_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USERID_FAILURE,
  GET_RESTAURANT_BY_USERID_REQUEST,
  GET_RESTAURANT_BY_USERID_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANTS_EVENT_FAILURE,
  GET_RESTAURANTS_EVENT_REQUEST,
  GET_RESTAURANTS_EVENT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./actionType";

export const getAllRestaurants = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
      const { data } = await api.get("/api/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
      console.log("Restaurants", data);
    } catch (error) {
      dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
      console.log(error);
    }
  };
};

export const getRestaurantById = (reqData) => {
    return async (dispatch) => {
      dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST});
      try {
        const {data}  = await api.get(`/api/restaurants/${reqData.restaurantId}`, {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        });
  
        dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
        console.log("get restaurant by id", data);
      } catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
        console.log(error);
      }
    };
  };

  export const getRestaurantByUserId = (token) => {
    return async (dispatch) => {
      dispatch({ type: GET_RESTAURANT_BY_USERID_REQUEST});
      try {
        const {data}  = await api.get(`/api/admin/restaurants/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: GET_RESTAURANT_BY_USERID_SUCCESS, payload: data });
        console.log("Get restaurant by userId", data);
      } catch (error) {
        dispatch({ type: GET_RESTAURANT_BY_USERID_FAILURE, payload: error });
        console.log(error);
      }
    };
  };


  export const createRestaurant = (reqData) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_RESTAURANT_REQUEST});
      try {
        const { data } = await api.post(`/api/admin/restaurants`, reqData.data, {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        });
  
        dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
        console.log("Created restaurant", data);
      } catch (error) {
        dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
        console.log(error);
      }
    };
};


  export const updateRestaurant = ({restaurantId, resData,token}) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_RESTAURANT_REQUEST});
      try {
        const {data}  = await api.put(`/api/admin/restaurants/${restaurantId}`,resData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: data });
        console.log("Updated restaurant", data);
      } catch (error) {
        dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
        console.log(error);
      }
    };
  };

  export const deleteRestaurant = ({restaurantId,token}) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_RESTAURANT_REQUEST});
      try {
        const {data}  = await api.delete(`/api/admin/restaurants/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        //?????????????????????????????????????????????????????????????????
        dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
        console.log("Deleted restaurant", data);
      } catch (error) {
        dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
        console.log(error);
      }
    };
  };

  export const updateRestaurantStatus = ({restaurantId,token}) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST});
      try {
        const {data}  = await api.put(`/api/admin/restaurants/${restaurantId}/status`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data });
        console.log("Restaurant status updated", data);
      } catch (error) {
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
        console.log(error);
      }
    };
  };

  export const createEvent = ({ data: eventData, restaurantId, token }) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_EVENT_REQUEST });
      try {
        const response = await api.post(`/api/admin/events/restaurant/${restaurantId}`, { data: eventData }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: CREATE_EVENT_SUCCESS, payload: response.data });
        console.log("Event created", response.data);
      } catch (error) {
        dispatch({ type: CREATE_EVENT_FAILURE, payload: error });
        console.log(error);
      }
    };
  };
  
  
  export const getAllEvents = ({token}) => {
    return async (dispatch) => {
      dispatch({ type: GET_ALL_EVENT_REQUEST});
      try {
        const {data}  = await api.get(`/api/admin/events`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: GET_ALL_EVENT_SUCCESS, payload: data });
        console.log("Get all events", data);
      } catch (error) {
        dispatch({ type: GET_ALL_EVENT_FAILURE, payload: error });
        console.log(error);
      }
    };
  };
  
  export const deleteEvent = ({eventId,token}) => {
    return async (dispatch) => {
      dispatch({ type: DELETE_EVENT_REQUEST});
      try {
        const {data}  = await api.delete(`/api/admin/events/${eventId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
        console.log("Deleted events", data);
      } catch (error) {
        dispatch({ type: DELETE_EVENT_FAILURE, payload: error });
        console.log(error);
      }
    };
  };

  export const getRestaurantEvent = ({restaurantId,token}) => {
    return async (dispatch) => {
      dispatch({ type: GET_RESTAURANTS_EVENT_REQUEST});
      try {
        const {data}  = await api.get(`/api/admin/events/restaurant/${restaurantId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: GET_RESTAURANTS_EVENT_SUCCESS, payload: data });
        console.log("Get restaurant events", data);
      } catch (error) {
        dispatch({ type: GET_RESTAURANTS_EVENT_FAILURE, payload: error });
        console.log(error);
      }
    };
  };

  export const createCategory = ({reqData,token}) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_CATEGORY_REQUEST});
      try {
        const {data}  = await api.post(`/api/admin/category`,reqData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
        console.log("Created category", data);
      } catch (error) {
        dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
        console.log(error);
      }
    };
  };

  export const getRestaurantsCategory = ({restaurantId,token}) => {
    return async (dispatch) => {
      dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST});
      try {
        const {data}  = await api.get(`/api/category/restaurant/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: data });
        console.log("Created category", data);
      } catch (error) {
        dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
        console.log(error);
      }
    };
  };