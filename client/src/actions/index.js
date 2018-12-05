import axios  from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';


//formProps contain { email, password }
export const Signup = (formProps, callback) => async dispatch => {
   try{
       const response = await axios.post('http://localhost:3090/signup', formProps);
       dispatch({ type: AUTH_USER, payload: response.data.token });
       localStorage.setItem('token', response.data.token)
       callback();
   } catch (e) {
       dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
   }
};

export const Signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3090/signin', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token)
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid Login credentials' });
    }
};

export const Signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    };
};
