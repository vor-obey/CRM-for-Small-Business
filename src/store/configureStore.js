import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducers } from "./rootReducer";

export const store = createStore(reducers, composeWithDevTools());
