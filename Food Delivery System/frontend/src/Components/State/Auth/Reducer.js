import { isPresentInFavorites } from "../../Config/config";
import {
    ADD_TO_FAVORITES_FAILURE,
  ADD_TO_FAVORITES_REQUEST,
  ADD_TO_FAVORITES_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token:null,
  favorites: [],
  success: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case ADD_TO_FAVORITES_REQUEST:
    case ADD_TO_FAVORITES_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload,
        success: "Request Success",
      };
    
      case GET_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload,
          favorites:action.payload.favorites
        };

    case ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        favorites: isPresentInFavorites(state.favorites, action.payload)
          ? state.favorites.filter((item) => item.id !== action.payload.id)
          : [action.payload, ...state.favorites],
      };
    
    case LOGOUT_REQUEST:
      return initialState;

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case ADD_TO_FAVORITES_FAILURE:
    case ADD_TO_FAVORITES_FAILURE:
      return { ...state, isLoading: true, error: action.payload, success: null };
    default:
      return state;
  }
};
export default authReducer;