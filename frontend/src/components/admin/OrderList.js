import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { DELETE_ORDERS_RESET } from "../../constants/orderConstants";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, isDeleted]);

  const deleteOrderHandler = (e) => {
    const id = e.currentTarget.value;
    dispatch(deleteOrder(id));
    alert("Order deleted successfully");
    navigate("/dashboard");
    dispatch({ type: DELETE_ORDERS_RESET });
  };

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `Rs ${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green",fontWeight:"bold" }}>{order.orderStatus}</p>
          ) : order.orderStatus &&
            String(order.orderStatus).includes("Shipped") ? (
            <p style={{ color: "#ffad15",fontWeight:"bold" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red",fontWeight:"bold" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i title="Update" className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              value={order._id}
              onClick={deleteOrderHandler}
            >
              <i title="Delete" className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Orders List</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersList;
