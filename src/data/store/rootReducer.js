import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import {autocompleteReducer} from "./autocomplete/autocompleteReducer";
import {auxiliaryReducer} from "./auxiliary/auxiliaryReducer";

export const reducers = combineReducers({
    userReducer,
    autocompleteReducer,
    auxiliaryReducer
});
