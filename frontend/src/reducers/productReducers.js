import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';

//----------------------------------------------------------------
export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) { 
        case ALL_PRODUCTS_REQUEST:
            return {
            loading: true,
                products:[]
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage
            }
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default: return state;
    }
}
export const newProductReducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST: 
            return {
                ...state,
                loading: true,
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product:action.payload.product
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_PRODUCT_RESET:
                return {
                    ...state,
                    success: false
                }
        default: return state;
    }
}

//ADMIN -- handle DELETE and UPDATE actions
export const productReducer = (state = { product: {} }, action) => { //to handle Both (ADMIN) Deleting and Updating products
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST: 
            case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
            }
        case UPDATE_PRODUCT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isUpdated: action.payload.success,
            }
        
        case DELETE_PRODUCT_FAIL:
            case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        
        case DELETE_PRODUCT_RESET:
                return {
                    ...state,
                    isDeleted: false
            }
        case UPDATE_PRODUCT_RESET:
                return {
                    ...state,
                    isUpdated: false
            }
        
        case CLEAR_ERRORS:
                return {
                    ...state,
                    error:null
                }
        default: return state;
    }
}

export const adminProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) { 
        case ADMIN_PRODUCTS_REQUEST:
            return {
            loading: true,
                products:[]
            }
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default: return state;
    }
}

export const productDetailsReducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: 
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default: return state;
    }
}


export const newReviewReducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST: 
            return {
                ...state,
                loading: true,
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
                return {
                    ...state,
                    success: false
                }
        default: return state;
    }
}