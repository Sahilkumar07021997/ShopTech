import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDERS_REQUEST,
  UPDATE_ORDERS_SUCCESS,
  UPDATE_ORDERS_RESET,
  UPDATE_ORDERS_FAIL,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_FAIL,
  DELETE_ORDERS_SUCCESS,
  DELETE_ORDERS_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myOrdersReducers = (state = { orders: [] }, action) => {
  switch (action.type) { 
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      }
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      }
    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}


export const ordersDetailsReducers = (state = { orders: {} }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      }
    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        totalAmount: action.payload.totalAmount,
      }
    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};

//ADMIN -- handle DELETE and UPDATE actions
export const orderReducer = (state = {}, action) => { //to handle Both (ADMIN) Deleting and Updating ORDERS
  switch (action.type) {
    case UPDATE_ORDERS_REQUEST:
      case DELETE_ORDERS_REQUEST:
          return {
              ...state,
              loading: true,
          }
      
    case UPDATE_ORDERS_SUCCESS:
              return {
                  ...state,
                  loading: false,
                  isUpdated: action.payload
      }
    
    case DELETE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
}

    case UPDATE_ORDERS_FAIL:
      case DELETE_ORDERS_FAIL:
          return {
              ...state,
              error: action.payload
          }
      

      case UPDATE_ORDERS_RESET:
              return {
                  ...state,
                  isUpdated: false
      }
    
       case DELETE_ORDERS_RESET:
            return {
                ...state,
                isDeleted: false
      }
    
      case CLEAR_ERRORS:
              return {
                  ...state,
                  error:null
              }
      default: return state;
  }
}