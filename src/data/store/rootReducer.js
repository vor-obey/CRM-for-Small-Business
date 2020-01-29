import { combineReducers } from "redux";

import { userReducer } from "./user/userReducer";
import {autocompleteReducer} from "./autocomplete/autocompleteReducer";

export const reducers = combineReducers({
    userReducer, autocompleteReducer: autocompleteReducer
});
