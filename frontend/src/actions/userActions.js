import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    DELETE_USER_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from "../constants/userConstants";

//LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        
        const config = {
            Headers: {
                'content-type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/v1/login', {email, password}, config)
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.errorMessage
        })
    }
}
//REGISTER user
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        
        const config = {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const {data} = await axios.post('/api/v1/register', userData, config)
        
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.errorMessage,
        })
    }
}

//LOAD user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const {data} = await axios.get('/api/v1/me')
        
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.error,
        })
    }
}

//LOGOUT USER
export const logout = () => async (dispatch) => {
    try {

        await axios.get('/api/v1/logout')
        
        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.errorMessage,
        })
    }
}

//UPDATE USER PROFILE
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        
        const config = {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const {data} = await axios.put('/api/v1/me/update', userData, config)
        
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.errorMessage,
        })
    }
}

//UPDATE USER PASSWORD
export const updatePassword = (password) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })
        
        const config = {
            Headers: {
                'content-type': 'application/json'
            }
        }

        const {data} = await axios.put('/api/v1/password/update', password, config)
        
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        // debugger;
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.errorMessage,
        })
    }
}

//FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })
        
        const config = {
            Headers: {
                'content-type': 'application/json'
            }
        }

        const {data} = await axios.post('/api/v1/password/forgot', email, config)
        
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        // debugger;
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}

//RESET PASSWORD
export const resetPassword = (token,password) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PASSWORD_REQUEST })
        
        const config = {
            Headers: {
                'content-type': 'application/json'
            }
        }

        const {data} = await axios.put(`/api/v1/password/reset/${token}`, password, config)
        
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        // debugger;
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message,
        })
    }
}

//LOAD All users -- (ADMIN ONLY)
export const allUsers = () => async (dispatch) => {
    try {
        dispatch({ type:ALL_USERS_REQUEST })

        const {data} = await axios.get('/api/v1/admin/users')
        
        dispatch({
            type:ALL_USERS_SUCCESS,
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type:ALL_USERS_FAIL,
            payload: error.response.data.error,
        })
    }
}

//get user details -- (ADMIN ONLY)
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type:USER_DETAIL_REQUEST })

        const {data} = await axios.get(`/api/v1/admin/user/${id}`)
        
        dispatch({
            type:USER_DETAIL_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type:USER_DETAIL_FAIL,
            payload: error.response.data.error,
        })
    }
}

//delete user details -- (ADMIN ONLY)
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type:DELETE_USER_REQUEST })

        const {data} = await axios.delete(`/api/v1/admin/user/${id}`)
        
        dispatch({
            type:DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type:DELETE_USER_FAIL,
            payload: error.response.data.error,
        })
    }
}

//UPDATE USER PROFILE
export const updateUser = (userData,id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST })
        
        const config = {
            Headers: {
                'content-type': 'application/json'
            }
        }

        const {data} = await axios.put(`/api/v1/admin/user/${id}`, userData, config)
        
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.errorMessage,
        })
    }
}


//CLEAR_ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}

