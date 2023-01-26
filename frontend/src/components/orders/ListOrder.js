import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import { myOrders, clearErrors } from "../../actions/orderActions";
import _ from "underscore";

const ListOrder = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        //give specification of each column
        {
          label: "Order Details",
          field: "orderDetails",
          sort: "asc",
        },
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Number of Items",
          field: "numOfItems",
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
          sort: "asc",
        },
      ],
      rows: [],
    };

    _.forEach(orders, (order) => {
      data.rows.push({
        orderDetails: order.orderItems[0].name,
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"My Orders"} />
          <h1 className="mt-5">My Orders</h1>

          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListOrder;
