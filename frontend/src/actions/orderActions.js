import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  CLEAR_ERRORS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_ORDERS_FAIL,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
} from "../constants/orderConstants.js";
import axios from "axios";

// Create a new order
export const createOrder = (order) => async (dispatch, getState) => {
 
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.errorMessage,
    });
  }
};


//show current logged user orders
export const myOrders = (id) => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get('/api/v1/orders/me')
        
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload:data.orders
        })
        
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload:error.response.data.errorMessage
        })
    }
} 


//Get order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/order/${id}`)
    
      dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload:data.order
      })
      
  } catch (error) {
      dispatch({
          type: ORDER_DETAILS_FAIL,
          payload:error.response.data.errorMessage
      })
  }
} 

//Get All orders -- ADMIN only
export const allOrders = () => async (dispatch) => {
  try {
      dispatch({ type: ALL_ORDERS_REQUEST });

      const { data } = await axios.get(`/api/v1/admin/orders`)
      dispatch({
          type: ALL_ORDERS_SUCCESS,
        payload: data,
      })
      
  } catch (error) {
      dispatch({
          type: ALL_ORDERS_FAIL,
          payload:error.response.data.errorMessage
      })
  }
}

// Update Order --ADMIN only
export const updateOrder = (id,orderData) => async (dispatch, getState) => {
  debugger;
  try {
    dispatch({ type: UPDATE_ORDERS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config);

    dispatch({
      type: UPDATE_ORDERS_SUCCESS,
      payload: data.success
    });

  } catch (error) {
    dispatch({
      type: UPDATE_ORDERS_FAIL,
      payload: error.response.data.errorMessage,
    });
  }
};


// Delete Order --ADMIN only
export const deleteOrder = (id) => async (dispatch) => {
  
  try {
    dispatch({ type: DELETE_ORDERS_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({
      type: DELETE_ORDERS_SUCCESS,
      payload: data.success
    });

  } catch (error) {
    dispatch({
      type: DELETE_ORDERS_FAIL,
      payload: error.response.data.errorMessage,
    });
  }
};


// clear all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
