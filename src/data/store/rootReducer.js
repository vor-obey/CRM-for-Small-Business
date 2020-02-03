import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import { customerReducer } from "./customer/customerReducer"
import {autocompleteReducer} from "./autocomplete/autocompleteReducer";
import {orderReducer} from "./order/orderReducer";

export const reducers = combineReducers({
    customerReducer,
    userReducer,
    autocompleteReducer,
    orderReducer
});
