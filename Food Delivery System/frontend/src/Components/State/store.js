import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk";
import restaurantReducer from "./Restaurant/reducer";
import menuItemReducer from "./Menu/reducer";
import cardReducer from "./Card/reducer";
import orderReducer from "./Order/reducer";
import restaurantOrderReducer from "./RestaurantOrder/reducer";
import ingredientReducer from "./Ingredients/reducer";

const rooteReducer = combineReducers({
    auth:authReducer,
    restaurant:restaurantReducer,
    menu:menuItemReducer,
    card:cardReducer,
    order:orderReducer,
    restaurantOrder:restaurantOrderReducer,
    ingredient:ingredientReducer
})

export const store = legacy_createStore(rooteReducer,applyMiddleware(thunk));