import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import {autocompleteReducer} from "./autocomplete/autocompleteReducer";
import {auxiliaryReducer} from "./auxiliary/auxiliaryReducer";
import {orderReducer} from "./order/orderReducer";

export const reducers = combineReducers({
    userReducer,
    autocompleteReducer,
    auxiliaryReducer,
    orderReducer
});
