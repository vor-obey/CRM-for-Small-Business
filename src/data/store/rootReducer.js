import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import {auxiliaryReducer} from "./auxiliary/auxiliaryReducer";

export const reducers = combineReducers({
    userReducer,
    auxiliaryReducer
});
