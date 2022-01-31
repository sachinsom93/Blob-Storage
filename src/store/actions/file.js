import axios from '../../axios';
import { FILE_DELETE, FILE_DELETE_SUCCESS, FILE_DOWNLOAD, FILE_DOWNLOAD_ERROR, FILE_DOWNLOAD_SUCCESS, FILE_LOAD, FILE_LOAD_SUCCESS, FILE_RENAME, FILE_RENAME_SUCCESS, FILE_UPLOAD, FILE_UPLOAD_ERROR, FILE_UPLOAD_SUCCESS } from '../types/file';
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


// Action generator to rename file
export const renameFile = (fileID, newName) => async dispatch => {

    const data = {
        "id": fileID,
        "new_blob_name": newName
    }

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
    dispatch({ type: FILE_RENAME })
    axios.patch(`/blob/rename`,data, config)
        .then((res) => {
            dispatch({type: FILE_RENAME_SUCCESS});
            dispatch(setAlert('File Renamed Succesfully', 'success'));
            dispatch(loadFiles())
        })
        .catch((err) => {
            const msg = (err.response.data.detail) ? (err.response.data.detail) :'File Renamed Failed.'
            dispatch({ type: FILE_UPLOAD_ERROR, payload: { data: { error: msg }}})
            dispatch(setAlert(msg, "warning"))
        })
  };


// Action generator to downloading file
export const downloadFile = (fileID, FileName) => async dispatch => {

    // Config headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
      responseType: "blob"
    }

    // Get token from localstorage
    const token = localStorage.getItem('blob_token')

    // If token available add to headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    } else {
        dispatch({ type: FILE_DOWNLOAD_ERROR })
        return
    }

    // Request the server
    dispatch({ type: FILE_DOWNLOAD })
    axios.get(`/blob/download/${fileID}`,config)
        .then((res) => {
            // Set alert
            dispatch({type: FILE_DOWNLOAD_SUCCESS});
            dispatch(setAlert('File Downloaded Succesfully', 'success'));

            // Create blob object
            let blob = new Blob([res.data], {type: 'application/octet-stream'})

            // Create Object URL
            const data = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = data;
            link.download = FileName;

            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                })
            );
            setTimeout(() => {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        })
        .catch((err) => {
            const msg = (err.response.data.detail) ? (err.response.data.detail) :'File Downloading Failed.'
            dispatch({ type: FILE_DOWNLOAD_ERROR, payload: { data: { error: msg }}})
            dispatch(setAlert(msg, "warning"))
        })
  };