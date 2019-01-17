import { FILES_ERROR, GET_FILES } from './types';

const INITIAL_STATE = {
    files: [],
    errorMessage: '',
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_FILES:
            return { ...state, authenticated: action.payload };
        case FILES_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}

