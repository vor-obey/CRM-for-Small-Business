import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import {autocompleteReducer} from "./autocomplete/autocompleteReducer";
import {orderReducer} from "./order/orderReducer";
import {auxiliaryReducer} from "./auxiliary/auxiliaryReducer";

export const reducers = combineReducers({
    userReducer,
    autocompleteReducer,
    orderReducer,
    auxiliaryReducer
});
