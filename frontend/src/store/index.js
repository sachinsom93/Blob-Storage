/**
 * Entry Point for Redux Store.
*/
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore, combineReducers } from 'redux';

import { authReducer } from './reducers/auth';
import { alertReducer } from './reducers/alert';
import { fileReducer } from './reducers/file';

// Middlewares
const middlewares = [thunk]

// Root Reducer
const rootReducer = combineReducers({
    authReducer: authReducer,
    alertReducer: alertReducer,
    fileReducer: fileReducer
})


// Initial State
const initialState = {};

// Store Configuration and Creation
export const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)) // Chrome Interation for Watching Redux State Changes
)
