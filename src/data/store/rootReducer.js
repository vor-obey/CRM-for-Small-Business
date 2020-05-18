import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import {auxiliaryReducer} from "./auxiliary/auxiliaryReducer";
import {orderReducer} from "./order/orderReducer";

export const reducers = combineReducers({
    userReducer,
    auxiliaryReducer,
    orderReducer
});
