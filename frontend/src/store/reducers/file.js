import { FILE_DELETE, FILE_DELETE_ERROR, FILE_DELETE_SUCCESS, FILE_LOAD, FILE_LOAD_ERROR, FILE_LOAD_SUCCESS, FILE_UPLOAD, FILE_UPLOAD_ERROR, FILE_UPLOAD_SUCCESS } from '../types/file';



const initialState = {
    isLoading: false,
    error: '',
    files: null
}

export const fileReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case FILE_UPLOAD:
        case FILE_LOAD:
        case FILE_DELETE:
            return {
                ...state,
                isLoading: true
            }

        case FILE_UPLOAD_ERROR:
        case FILE_LOAD_ERROR:
        case FILE_DELETE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: payload.data.error
            }

        case FILE_UPLOAD_SUCCESS:
            return {
                ...state,
                isLoading: false
            }

        case FILE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                files: payload.data.files
            }

        case FILE_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}