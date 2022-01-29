/**
 * Reducer for user authentication.
*/

import {
    LOGIN_FAILED,
    LOGIN_PROCESS,
    LOGIN_SUCCESSFULL,
    SIGNUP_FAILED,
    SIGNUP_PROCESS,
    SIGNUP_SUCCESSFULL,
    USER_LOADING_PROCESS,
    USER_LOAD_ERROR,
    USER_LOADED
} from '../types/auth';


// Initial State
const initialState = {
    token: '',
    isLoading: false,
    isRegistered: false,
    isAuthenticated: false,
    error: '',
    user: null
}


// Reducer Definition
export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_PROCESS:
        case SIGNUP_PROCESS:
        case USER_LOADING_PROCESS:
            return {
                ...state,
                isLoading: true,
                error: '',
            }

        case LOGIN_FAILED:
        case SIGNUP_FAILED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                isRegistered: false,
                error: payload.data.error
            }

        case SIGNUP_SUCCESSFULL:
            return {
                ...state,
                isLoading: false,
                isRegistered: true,
            }

        case LOGIN_SUCCESSFULL:
            localStorage.setItem('blob_token', payload.data.auth_token)
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                error: '',
            }

        case USER_LOADED:
        return{
            ...state,
            isLoading: false,
            isAuthenticated: true,
            isRegistered: true,
            user: payload.data.user
        }

        case USER_LOAD_ERROR:
        return {
            ...state,
            isLoading: false,
            isAuthenticated: false
        }
        default:
            return state;
    }
}