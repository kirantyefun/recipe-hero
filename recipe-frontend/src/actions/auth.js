import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCUESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLOSE_SNACKBAR,
    RESET_RECIPE_STATE
} from './types';


export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({
            type: AUTHENTICATED_SUCCUESS
        })
    } else {
        dispatch ({
            type: AUTHENTICATED_FAIL
        })
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('access')}`,
                'Accept': 'application/json',
            }
        }
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
};


export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const register = (email, password, username) => async dispatch => {
    console.log("inside register");
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // console.log();
    const body = JSON.stringify({ email, password, username });
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/register/`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
        })
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: RESET_RECIPE_STATE
    })
};

export const closeSnackbar = () => dispatch => {
    dispatch({
        type: CLOSE_SNACKBAR
    })
}