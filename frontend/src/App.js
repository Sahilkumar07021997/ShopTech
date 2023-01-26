import './App.css';
import React,{useEffect, useRef, useState} from 'react';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails';
import ComingSoon from './utils/ComingSoon';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import { loadUser } from './actions/userActions';
import store from './store';
import ProtectedRoute from './routes/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrder from './components/orders/ListOrder';
import OrderDetails from './components/orders/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrdersList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';
//----------------------------------------------------------------


function App() {

  const { isAuthenticated, user } = useSelector(state => state.auth)
  
  const isAdmin = () => {
    return user.role === "admin";
  };
  const [stripeApiKey,setStripeApiKey] = useState("")

  useEffect(() => {
    store.dispatch(loadUser())
    
    const getStripeApiKey = async () => { //calling to get stripe api key
      const {data} = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();

  }, [])
  
  
  
  return (
    <Router>
      <div className="App"> 
        <Header/>
        <Routes className="container container-fluid">
          <Route path="/" element={<Home />} exact />
          <Route path="/search/:keyword" element={<Home />}/>
          <Route path="/product/:id" element={<ProductDetails />} exact />
          <Route path="/cart" element={<Cart />} exact />
          <Route path="/shipping" element={isAuthenticated?<Shipping />:<Login />} exact />
          <Route path="/confirm" element={isAuthenticated?<ConfirmOrder />:<Login />} exact />
          <Route path="/payment" element={
            stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
            {isAuthenticated?<Payment/>:<Login/>}
            </Elements>} />
          <Route path="/orders/me" element={isAuthenticated?<ListOrder />:<Login />} exact />
          <Route path="/order/:id" element={isAuthenticated?<OrderDetails />:<Login />} exact />
          <Route path="/success" element={<OrderSuccess />} exact />
          <Route path="/comingsoon" element={<ComingSoon />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} exact />
          <Route path="/password/reset:token/" element={<NewPassword />} exact />
          <Route path="/me" element={<Profile />} exact />
          <Route path="/me/update" element={<UpdateProfile />} exact />
          <Route path="/password/update" element={<UpdatePassword />} exact />
        </Routes>    
        <Routes>
          <Route path="/dashboard" element={
                  isAuthenticated && isAdmin() ? <Dashboard /> : <Home />
                } exact />
           <Route path="/admin/products" element={
                  isAuthenticated && isAdmin() ? <ProductList /> : <Home />
                } exact />
           <Route path="/admin/product" element={
                  isAuthenticated && isAdmin() ? <NewProduct /> : <Home />
                } exact />
          <Route path="/admin/product/:id" element={
                  isAuthenticated && isAdmin() ? <UpdateProduct /> : <Home />
                } exact />
           <Route path="/admin/orders" element={
                  isAuthenticated && isAdmin() ? <OrdersList /> : <Home />
                } exact />
           <Route path="/admin/order/:id" element={
                  isAuthenticated && isAdmin() ? <ProcessOrder /> : <Home />
                } exact />
          <Route path="/admin/users" element={
                  isAuthenticated && isAdmin() ? <UsersList /> : <Home />
                } exact />
          <Route path="/admin/user/:id" element={
                  isAuthenticated && isAdmin() ? <UpdateUser /> : <Home />
                } exact />
      </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
