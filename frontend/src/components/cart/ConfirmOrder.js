import React, { Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {

    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    const navigate = useNavigate();

     // Calculate Order Prices with taxes and shipping charges
     const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
     const shippingPrice = itemsPrice > 300 ? 0 : 60
     const GST = Number((0.05 * itemsPrice).toFixed(2))
     const totalPrice = (itemsPrice + shippingPrice + GST).toFixed(2)

     const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            GST,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')
    }


  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between mx-3">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems.map((item) => (
            <Fragment>
              <hr />
              <div className="cart-item my-1" key={item.product}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x Rs{item.price} ={" "}
                      <b>Rs{(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">Rs{itemsPrice}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">Rs{shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">Rs{GST}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">Rs{totalPrice}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
