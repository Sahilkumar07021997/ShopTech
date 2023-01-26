import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
   ADMIN_PRODUCTS_REQUEST,
   ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants';

//------------------------------------------------------------------------------

export const getProducts = (keyword='',currentPage = 1) => async (dispatch) => { //getting all products
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`);
        
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        });
    }
}

export const getProductDetails = (id) => async (dispatch) => {  //getting single product details
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newProduct = (productData) => async (dispatch) => { //adding new products (ADMIN)
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`/api/v1/admin/product/new`,productData,config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteProduct = (id) => async (dispatch) => { //deleting product (ADMIN only)
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Updating product ADMINS only
export const updateProduct = (id,productData) => async (dispatch) => { //Updating product (ADMIN)
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/product/${id}`,productData,config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => { //submit or update the review
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/review`,reviewData,config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminProducts = () => async (dispatch) => {  //getting single product details
    try {

        dispatch({ type: ADMIN_PRODUCTS_REQUEST })

        const { data } = await axios.get(`/api/v1/admin/products`)

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })

    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}