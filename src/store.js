import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import userReducer from './ducks/userReducer';
import itemsReducer from './ducks/itemsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    userReducer: userReducer,
    itemsReducer: itemsReducer
})

export default createStore( rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))