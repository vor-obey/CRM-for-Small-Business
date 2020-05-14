import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import {autocompleteReducer} from "./autocomplete/autocompleteReducer";
import {auxiliaryReducer} from "./auxiliary/auxiliaryReducer";
import {customerReducer} from "./customer/customerReducer";

export const reducers = combineReducers({
    userReducer,
    autocompleteReducer,
    auxiliaryReducer,
    customerReducer
});
