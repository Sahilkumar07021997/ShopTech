import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer,productDetailsReducer, adminProductsReducer,newProductReducer,newReviewReducer,productReducer } from './reducers/productReducers';
import { authReducer,userReducer,forgotPasswordReducer, allUsersReducer, userDetailsReducer, } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducers';
import { newOrderReducer,myOrdersReducers,ordersDetailsReducers, allOrdersReducer, orderReducer } from './reducers/orderReducers';
//----------------------------------------------------------------

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    product:productReducer, // product deleteing and updating (ADMIN only)
    auth: authReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    allUsers: allUsersReducer, // all users (ADMIN only)
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducers,
    orderDetails: ordersDetailsReducers,
    allOrders: allOrdersReducer,
    order:orderReducer,   //Updating orders (ADMIN ONLY)
    adminProducts: adminProductsReducer,
    newReview: newReviewReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) : [],//if u have any itms in cart already!  
        
        shippingInfo: localStorage.getItem('shippingInfo') ?
            JSON.parse(localStorage.getItem('shippingInfo')) : {} //shipping info already exists
        
    }
};  // initial states preloading!

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));



export default store;