import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const params = useParams();
  const dispatch = useDispatch();

  const { loading, orders = {} } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = orders;
  const { error, isUpdated } = useSelector((state) => state.order);

  const orderId = params.id; // orderId whichever is passed in!

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, isUpdated, orderId]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
    alert("Order updated successfully🥱");
    dispatch({ type: UPDATE_ORDERS_RESET });
  };

  return (
    <Fragment>
      <MetaData title={`Process Order # ${orders && orders._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5 font-weight-bold">Order # {orders._id}</h2>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name: </b> {user && user.name}
                  </p>
                  <p>
                    <b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
                  </p>
                  <p className="mb-4">
                    <b>Address: </b>
                    {shippingDetails}
                  </p>
                  <p>
                    <b>Amount:</b> Rs {totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Payment: </h4>
                  <p className={isPaid ? "greenColor" : "redColor"}>
                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                  </p>

                  <h4 className="my-4">Stripe ID: </h4>
                  <p>
                    <b>{paymentInfo && paymentInfo.id}</b>
                  </p>

                  <h4 className="my-4">Order Status: </h4>
                  <p
                    className={
                      orders.orderStatus &&
                      String(orders.orderStatus).includes("Delivered")
                        ? "greenColor"
                          : String(orders.orderStatus).includes("Shipped") ?
                            "yellowColor":"redColor"
                    }
                  >
                    <b style={{fontWeight:"bold"}}>{orderStatus}</b>
                  </p>

                  <h4 className="my-4">Order Items: </h4>

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
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateOrderHandler(orders._id)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
