import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import { customerReducer } from "./customer/customerReducer"
import {autocompleteReducer} from "./autocomplete/autocompleteReducer";

export const reducers = combineReducers({
    userReducer, customerReducer, autocompleteReducer: autocompleteReducer
});
