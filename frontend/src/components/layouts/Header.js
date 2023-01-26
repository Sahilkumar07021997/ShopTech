import React, { Fragment } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import "../../App.css";
import ComingSoon from "../../utils/ComingSoon";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from "../../actions/userActions";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector(state => state.auth); 
  const { cartItems } = useSelector(state => state.cart);
  
  const handleClickHome = () => {
    navigate("/");
  };


    const logoutHandler =  () => {
      dispatch(logout())
      alert("Logged out successfully!")
     return navigate("/");
    };

  const profileHandler = () => {
    navigate("/me");
  }

  const handleSearch = (keyword) => {
    if (keyword) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand" id="brand_logo">
            <button onClick={handleClickHome}>
              <img src="../images/shopTech_logo.png" alt="null" />
            </button>
          </div>
        </div>

        <div className="col-12 col-md-6 align-middle">
          <Search searchKeyword={(keyword) => handleSearch(keyword)} />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              ▤ Cart
            </span>
            <span className="ml-1" id="cart_count">
             {cartItems.length}
            </span>
          </Link>

          {user ? (
            <Dropdown className="ml-5 px-2 .bg-transparent d-inline">
            <Dropdown.Toggle  className="px-2 btn-sm text-white" variant="outlined" id="dropdown-basic">
                <figure className="avatar avatar-nav">
                    <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle mx-4"
                     />
                </figure>
                <span className="px-4">{user && user.name}</span>
            </Dropdown.Toggle>
  
            <Dropdown.Menu className="bg-dark">
                {user && user.role ==='admin' && (
                    <Dropdown.Item className="text-white" href="/dashboard">Dashboard</Dropdown.Item>
                )}
                 <Dropdown.Item className="text-white" href="/orders/me">Orders</Dropdown.Item>
                <Dropdown.Item className="text-white" onClick={profileHandler}>Profile</Dropdown.Item>
              <Dropdown.Item  onClick={logoutHandler} className="text-danger">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          ) : (
            !loading && (
              <Link to="/login" className="btn mx-2" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
