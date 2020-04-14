import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {reducers} from "./rootReducer";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './rootSaga';

let store;
const sagaMiddleware = createSagaMiddleware();

if (process.env.NODE_ENV === 'production') {
    store = createStore(reducers, applyMiddleware(sagaMiddleware));
} else {
    store = createStore(reducers, composeWithDevTools(
        applyMiddleware(sagaMiddleware),
    ));
}

sagaMiddleware.run(rootSaga);

export default store;



