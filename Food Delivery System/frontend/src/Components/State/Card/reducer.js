import { ADD_ITEM_TO_CARD_SUCCESS, CLEAR_CARD_SUCCESS, FIND_CARD_FAILURE, FIND_CARD_REQUEST, FIND_CARD_SUCCESS, GET_ALL_CARD_ITEMS_REQUEST, REMOVE_CARD_ITEM_FAILURE, REMOVE_CARD_ITEM_REQUEST, REMOVE_CARD_ITEM_SUCCESS, UPDATE_CARD_ITEM_FAILURE, UPDATE_CARD_ITEM_REQUEST, UPDATE_CARD_ITEM_SUCCESS } from "./actionType";
import { LOGOUT_REQUEST } from "../Auth/ActionType";

const initialState = {
    card:null,
    cardItems:[],
    loading:false,
    error:null
}

const cardReducer = (state = initialState, action ) => {
    switch (action.type) {
        case FIND_CARD_REQUEST:
        case GET_ALL_CARD_ITEMS_REQUEST:
        case UPDATE_CARD_ITEM_REQUEST:
        case REMOVE_CARD_ITEM_REQUEST:
            return {
                ...state,
                loading:false,
                error:null
            }
        
        case FIND_CARD_SUCCESS:
        case CLEAR_CARD_SUCCESS:
            return {
                ...state,
                loading:false,
                card: action.payload,
                cardItems: action.payload.items 
            }
        
        case ADD_ITEM_TO_CARD_SUCCESS:
            return{
                ...state,
                loading:false,
                cardItems:[action.payload, ...state.cardItems]
            }

        case UPDATE_CARD_ITEM_SUCCESS:
            return {
                ...state,
                loading:false,
                cardItems: state.cardItems.map((item)=> item.id === action.payload.id ? action.payload : item)

            }
        
        case REMOVE_CARD_ITEM_SUCCESS:
            return{
                ...state,
                loading:false,
                cardItems:state.cardItems.filter((item)=> item.id !== action.payload)
            }

        
        case FIND_CARD_FAILURE:
        case UPDATE_CARD_ITEM_FAILURE:
        case REMOVE_CARD_ITEM_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        
        case LOGOUT_REQUEST:
            localStorage.removeItem("token");
            return {...state,cardItems:[],card:null,success:"Logout success"}
            
    
        default:
           return state;
    }
}

export default cardReducer;