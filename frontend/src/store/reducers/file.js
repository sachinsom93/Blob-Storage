import {
    FILE_DELETE,
    FILE_DELETE_ERROR,
    FILE_DELETE_SUCCESS,
    FILE_DOWNLOAD,
    FILE_DOWNLOAD_ERROR,
    FILE_DOWNLOAD_SUCCESS,
    FILE_LOAD,
    FILE_LOAD_ERROR,
    FILE_LOAD_SUCCESS,
    FILE_RENAME,
    FILE_RENAME_ERROR,
    FILE_RENAME_SUCCESS,
    FILE_SHAREING,
    FILE_SHAREING_FAILED,
    FILE_SHAREING_SUCCESS,
    FILE_UPLOAD,
    FILE_UPLOAD_ERROR,
    FILE_UPLOAD_SUCCESS
} from '../types/file';



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
        case FILE_RENAME:
        case FILE_DOWNLOAD:
        case FILE_SHAREING:
            return {
                ...state,
                isLoading: true
            }

        case FILE_UPLOAD_ERROR:
        case FILE_LOAD_ERROR:
        case FILE_DELETE_ERROR:
        case FILE_RENAME_ERROR:
        case FILE_DOWNLOAD_ERROR:
        case FILE_SHAREING_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload.data.error
            }

        case FILE_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                files: payload.data.files
            }

        case FILE_DELETE_SUCCESS:
        case FILE_RENAME_SUCCESS:
        case FILE_UPLOAD_SUCCESS:
        case FILE_DOWNLOAD_SUCCESS:
        case FILE_SHAREING_SUCCESS:
            return {
                ...state,
                isLoading: false
            }

        default:
            return state;
    }
}