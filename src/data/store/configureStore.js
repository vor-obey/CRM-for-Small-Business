import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {reducers} from "./rootReducer";

let store;

if (process.env.NODE_ENV === 'production') {
    store = createStore(reducers, applyMiddleware(thunk));
} else {
    store = createStore(reducers, composeWithDevTools(
        applyMiddleware(thunk),
    ));
}

export default store;



