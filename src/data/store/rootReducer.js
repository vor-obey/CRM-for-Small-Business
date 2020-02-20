import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import { customerReducer } from "./customer/customerReducer"
import {autocompleteReducer} from "./autocomplete/autocompleteReducer";
import {orderReducer} from "./order/orderReducer";
import {auxiliaryReducer} from "./auxiliary/auxiliaryReducer";

export const reducers = combineReducers({
    customerReducer,
    userReducer,
    autocompleteReducer,
    orderReducer,
    auxiliaryReducer
});
