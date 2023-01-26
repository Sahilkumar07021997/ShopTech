import React, { Fragment, useState,useEffect } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import { getProducts,getProductDetails } from "../actions/productActions";
import Product from "./product/Product";
import Pagination from 'react-js-pagination';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Slider, {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
//------------------------------------------------------------------------------------------------
// const { createSliderWithTooltip } = Slider
// const Range = createSliderWithTooltip(Slider.Range)


const Home = () => {

 // const alert = useAlert(); //react alert part!
  const dispatch = useDispatch();
  const { loading, products, error, productsCount ,resPerPage} = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  const keyword = params.keyword;

  // console.log(products);
  useEffect(() => {
    // if (error) { //react-alert part
    //   return alert.error(error);
    // }
    dispatch(getProducts(keyword,currentPage));
  }, [dispatch,keyword,currentPage]);

  

  const setCurrentPageNo = (pageNumber) => { 
    setCurrentPage(pageNumber)
  }
  return (
    <Fragment>
      <MetaData title={"Buy best products online"} />
      {loading ? <Loader/>: 
        <Fragment>
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>

          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={'Next'}
              prevPageText={'Previous'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>

        </Fragment>
      }
    </Fragment>
  );
};

export default Home;

