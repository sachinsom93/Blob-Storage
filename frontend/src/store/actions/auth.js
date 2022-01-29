/*
*  Action generators for
*  Auth reducer.
*/

import axios from '../../axios';
import {
  AUTH_DEFAULT,
  LOGIN_FAILED,
  LOGIN_PROCESS,
  LOGIN_SUCCESSFULL,
  LOGOUT_FAILED,
  LOGOUT_PROCESS,
  SIGNUP_FAILED,
  SIGNUP_PROCESS,
  SIGNUP_SUCCESSFULL,
  USER_LOADED,
  USER_LOADING_PROCESS,
  USER_LOAD_ERROR,
} from '../types/auth';
import { setAlert } from './alerts';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_AUTH_LOADING = 'TOGGLE_AUTH_LOADING';



// Action generator for auth default state
export const authDefault = () => dispatch => {
  dispatch({type: AUTH_DEFAULT})
};


// Action Generator to load user
export const loadUser = () => (dispatch, getState) => {
  if(!(getState() && getState().auth && getState().auth.user)){

    // User Loading
    dispatch({ type: USER_LOADING_PROCESS})

    // Get token from localstorage
    const token = localStorage.getItem('openmf_token')

    // add headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    // If token available add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    } else {
      dispatch({ type: USER_LOAD_ERROR })
      return
    }

    axios.get('/user/profile', config)
      .then(
        (res) => {
          if (res && (res.status === 200 || res.status === 201)) {
            dispatch({
              type: USER_LOADED,
              payload: {
                data: {
                  user: res.data.user
                }
              }
            })
          } else if (res && (res.status >= 400 && res.status < 500)) {
            dispatch({
              type: USER_LOAD_ERROR,
              payload: {
                data: res.data.message
              }
            })
            dispatch(setAlert(res.data.message))
        }
        }
      )
      .catch((err) => {
        dispatch({
          type: USER_LOAD_ERROR,
          payload: {
            data: {error: 'UNAUTHORIZED'}
          }
        })
      })
  }
}



// Action generator to handle login
export const login = (email, password, callback) => async dispatch => {
  // Login data
  const loginData = {
    email: email,
    password: password,
  }

  // Config headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  dispatch({
    type: LOGIN_PROCESS,
  })

  axios.post('/user/authenticate', loginData, config)
    .then((res) => {
      if(res && res.status === 200){
        dispatch({
          type: LOGIN_SUCCESSFULL,
          payload: {data: {auth_token: res.data.access_token}}
        })
        callback(false)
        dispatch(loadUser())
        dispatch(setAlert(res.data.message, 'success'))
      }
    })
    .catch((err) => {
      const res = err.response
      if(res && (res || res.status === 404 || res.status === 406 || res.status === 409 || res.status === 401)){
        dispatch({
          type: LOGIN_FAILED,
          payload: {data: res.data.message}
        })
        dispatch(setAlert(res.data.message))
      }
      else{
        dispatch({
          type: LOGIN_FAILED,
          payload: {data: 'Something went wrong.'}
        })
        dispatch(setAlert('Something went wrong, please try again.'))
      }
    })
};


// Action generator to handle signup
export const signUp = (name, email, password, history, callback) => (dispatch) => {
  // Body for post request
  const body = {
    name: name,
    email: email,
    password: password,
  }

  // Request header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  dispatch({type: SIGNUP_PROCESS})
  axios.post('/user/create', body, config)
    .then((res) => {
      if(res && (res.status === 200 || res.status === 201)){
        dispatch({type: SIGNUP_SUCCESSFULL})
        callback(false)
        history.push('/')
        dispatch(setAlert(res.data.message, 'success'))
        window.location.reload()
      }
    })
    .catch((err) => {
      var res = err.response
      if(res && (res.status === 400 || res.status === 406 || res.status === 409 || res.status === 401)){
        dispatch({type: SIGNUP_FAILED, payload: {data: res.data.message}})
      }
      else{
        dispatch({
          type: SIGNUP_FAILED,
          payload: {data: 'Something went wrong.'}
        })
      }
    })
}


// Action generator to handle logout
export const logout = (history) => (dispatch) => {
  const token = localStorage.getItem('openmf_token')

  // headers
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  }

  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }

  dispatch({
    type: LOGOUT_PROCESS
  })
  axios.post('/logout', {}, config)
    .then((res) => {
      if(res && res.status === 200){
        dispatch({
          type: LOGOUT
        })
        history.push('/')
        dispatch(setAlert('user logged out!','success'))
        window.location.reload()
      }
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_FAILED,
        payload: {
          data: {
            error: err.response.statusText
          }
        }
      })
    })
}


