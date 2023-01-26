import React, { Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import _ from "underscore";

const OrderDetails = () => {

    const params = useParams();
  const dispatch = useDispatch();

  const { loading, error, orders = {} } = useSelector(
    (state) => state.orderDetails
  );
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = orders;

  useEffect(() => {
    dispatch(getOrderDetails(params.id));

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, params.id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  
  const _printHandler = () => {
    return window.print();
  }

  return (
    <Fragment>
      <MetaData title={"Order Details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="row d-flex justify-content-between mx-3">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {orders._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user && user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {shippingDetails}
              </p>
              <p>
                <b>Amount:</b>Rs {totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orders.orderStatus &&
                  String(orders.orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>Rs {item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <button id="btn-print" className="btn btn-primary btn-sm" onClick={_printHandler}>Print</button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
