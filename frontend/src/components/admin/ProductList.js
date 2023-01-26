import React, { Fragment, useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Loader from "../layouts/Loader";
import Sidebar from "./Sidebar";
import { getAdminProducts, clearErrors ,deleteProduct} from "../../actions/productActions";
import _ from "underscore";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { loading, error, products } = useSelector(
    (state) => state.adminProducts
  );
  const { error: deleteError, isDeleted } = useSelector(state => state.product);

  useEffect(() => {
    
    dispatch(getAdminProducts());

    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, deleteError]);
  
  const deleteProductHandler = (e) => { 
    const id = e.currentTarget.value;
    dispatch(deleteProduct(id)); 
    alert('Product deleted successfully🥁');
    navigate('/dashboard')
    dispatch({type: DELETE_PRODUCT_RESET})
  }

  const setProducts = () => {
    const data = {
      columns: [
        //give specification of each column
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    _.forEach(products, (product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `Rs ${product.price}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary ml-3 py-1 px-2"
            >
              <i title="Edit" className="btn-primary" aria-hidden="true">edit</i>
            </Link>
                <button className="btn btn-danger py-1 px-2 ml-2" value={product._id} onClick={deleteProductHandler}>
                    <i title="Delete" className="fa fa-trash" ></i>
            </button>
          </Fragment>
        ),
      });
    });
    return data;
  };

  

    return (
        <Fragment>
        <MetaData title={'All Orders'} />
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>

            <div className="col-12 col-md-10">
                <Fragment>
                    <h1 className="my-5">All Products List</h1>

                    {loading ? <Loader /> : (
                        <MDBDataTable
                            data={setProducts()}
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
    )
};

export default ProductList;
