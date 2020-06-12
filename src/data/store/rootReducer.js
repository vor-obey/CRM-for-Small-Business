import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import {auxiliaryReducer} from "./auxiliary/auxiliaryReducer";
import {customerReducer} from "./customer/customerReducer";
import {orderReducer} from "./order/orderReducer";
import {productReducer} from "./product/productReducer";

export const reducers = combineReducers({
    userReducer,
    auxiliaryReducer,
    customerReducer,
    orderReducer,
    productReducer,
});
