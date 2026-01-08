import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENT_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USERID_SUCCESS,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANTS_EVENT_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./actionType";

const initialState = {
  restaurants: [],
  usersRestaurant: null,
  restaurant: null,
  loading: false,
  error: null,
  events: [],
  restaurantEvents: [],
  categories: [],
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
    case GET_ALL_RESTAURANTS_REQUEST:
    case DELETE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
    case GET_RESTAURANT_BY_ID_REQUEST:
    case CREATE_RESTAURANT_REQUEST:
    case GET_RESTAURANTS_CATEGORY_REQUEST:
      return { ...state, loading: false, error: null };

    case CREATE_RESTAURANT_SUCCESS:
      return { ...state, loading: false, usersRestaurant: action.payload };

    case GET_ALL_RESTAURANTS_SUCCESS:
      return { ...state, loading: false, restaurants: action.payload };

    case GET_RESTAURANT_BY_ID_SUCCESS:
      return { ...state, loading: false, restaurant: action.payload };

    case GET_RESTAURANT_BY_USERID_SUCCESS:
    case UPDATE_RESTAURANT_STATUS_SUCCESS:
    case UPDATE_RESTAURANT_SUCCESS:
      return { ...state, loading: false, usersRestaurant: action.payload };

    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.filter(
          (item) => item.id !== action.payload
        ),
        usersRestaurant: state.usersRestaurant.filter(
          (item) => item.id !== action.payload
        ),
      };

    case CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        restaurantEvents: [...state.restaurantEvents, action.payload],
      };

    case GET_ALL_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };

    case GET_RESTAURANTS_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantEvents: action.payload,
      };

    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((item) => item.id !== action.payload),
        restaurantEvents: state.restaurantEvents.filter(
          (item) => item.id !== action.payload
        ),
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };

    case GET_RESTAURANTS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case CREATE_RESTAURANT_FAILURE:
    case GET_ALL_RESTAURANTS_FAILURE:
    case DELETE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_FAILURE:
    case GET_RESTAURANT_BY_ID_FAILURE:
    case CREATE_EVENT_FAILURE:
    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default restaurantReducer;
