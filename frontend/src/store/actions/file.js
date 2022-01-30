import axios from '../../axios';
import { FILE_DELETE, FILE_DELETE_SUCCESS, FILE_LOAD, FILE_LOAD_SUCCESS, FILE_UPLOAD, FILE_UPLOAD_ERROR, FILE_UPLOAD_SUCCESS } from '../types/file';
import { setAlert } from './alert';

// Action generator to upload file
export const loadFiles = () => async dispatch => {

    // Config headers
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    // Get token from localstorage
    const token = localStorage.getItem('blob_token')

    // If token available add to headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        dispatch({ type: FILE_UPLOAD_ERROR })
        return
    }

    // Request the server
    dispatch({ type: FILE_LOAD })
    axios.get('/blob/files', config)
        .then((res) => {
            dispatch({type: FILE_LOAD_SUCCESS, payload: { data: { files: res.data }}});
        })
        .catch((err) => {
            const msg = (err.response.data.detail) ? (err.response.data.detail) :'File Loading Failed.'
            dispatch({ type: FILE_UPLOAD_ERROR, payload: { data: { error: msg }}})
            dispatch(setAlert(msg, "warning"))
        })
  };


// Action generator to upload file
export const uploadFile = (file) => async dispatch => {
    // Form data
    const data = new FormData()
    data.append('new_file', file[0])

    // Config headers
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    // Get token from localstorage
    const token = localStorage.getItem('blob_token')

    // If token available add to headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        dispatch({ type: FILE_UPLOAD_ERROR })
        return
    }

    // Request the server
    dispatch({ type: FILE_UPLOAD })
    axios.post('/blob/upload', data, config)
        .then((res) => {
            dispatch({type: FILE_UPLOAD_SUCCESS});
            dispatch(setAlert('File Uploaded Succesfully', 'success'));
            dispatch(loadFiles())
        })
        .catch((err) => {
            const msg = (err.response.data.detail) ? (err.response.data.detail) :'File Uploaded Failed.'
            dispatch({ type: FILE_UPLOAD_ERROR, payload: { data: { error: msg }}})
            dispatch(setAlert(msg, "warning"))
        })
  };


// Action generator to delete file
export const deleteFile = (fileID) => async dispatch => {

    // Config headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    // Get token from localstorage
    const token = localStorage.getItem('blob_token')

    // If token available add to headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        dispatch({ type: FILE_UPLOAD_ERROR })
        return
    }

    // Request the server
    dispatch({ type: FILE_DELETE })
    axios.delete(`/blob/delete/${fileID}`,config)
        .then((res) => {
            dispatch({type: FILE_DELETE_SUCCESS});
            dispatch(setAlert('File deleted Succesfully', 'success'));
            dispatch(loadFiles())
        })
        .catch((err) => {
            const msg = (err.response.data.detail) ? (err.response.data.detail) :'File Deleted Failed.'
            dispatch({ type: FILE_UPLOAD_ERROR, payload: { data: { error: msg }}})
            dispatch(setAlert(msg, "warning"))
        })
  };