import axios  from 'axios';
import { AUTH_USER, AUTH_ERROR, GET_FILES, FILES_ERROR} from './types';

const BASE_URL = 'http://localhost:3090';

//formProps contain { email, password }
export const Signup = (formProps, callback) => async dispatch => {
   try{
       const response = await axios.post(`${BASE_URL}/signup`, formProps);
       dispatch({ type: AUTH_USER, payload: response.data.token });
       localStorage.setItem('token', response.data.token)
       callback();
   } catch (e) {
       dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
   }
};

export const Signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(`${BASE_URL}/signin`, formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token)
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid Login credentials' });
    }
};

export const Signout = (callback) => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    };
};


export const GetFiles = (props, callback) => async dispatch => {
    try{
        const response = await axios.get(`${BASE_URL}/folder`, { params: props });
        dispatch({ type: GET_FILES, payload: response.data });

        callback(response);
    } catch (e) {
        dispatch({ type: FILES_ERROR, payload: 'Invalid Files Loading' });
    }
}