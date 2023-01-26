import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { addItemToCart } from "../../actions/cartActions";
//------------------------------------------------------------------------------

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getProductDetails(params.id));

    if (error) {
      console.log(`ERROR: ${error}`); //use alert instead of consoling
      dispatch(clearErrors(error)); //after that clearing the errors!
    }
  }, [dispatch, error, params.error]); //add alert also

  // const zoomIn =(event,image) => {
  //   let pre = document.getElementById('preview');
  //   pre.style.visibility = "visible";
  //   let img = document.getElementById("zoom1");

  //     pre.style.backgroundImage = `url(${img})`;
  //   let posX = event.offsetX; posX = -posX * 2.5;
  //   let posY = event.offsetY; posY = -posY * 5.5;

  //   pre.style.backgroundPosition=`calc(${posX}px + ${posY}px)`;
  // }

  // const zoomOut =()=>{
  //   let pre = document.getElementById("preview");
  //   pre.style.visibility = "hidden";
  // }

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addItemToCart(params.id, quantity));
    alert("Item added to cart 🚛");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <div className="container container-fluid">
            <div className="row f-flex justify-content-around">
              <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause="hover">
                  {product.images &&
                    product.images.map((image) => {
                      return (
                        <Carousel.Item key={image.public_id}>
                          <img
                            className="d-block w-100"
                            id="zoom1"
                            src={image.url}
                            //onMouseMove={zoomIn(Event,image.url)} onMouseOut={zoomOut()}
                            alt={product.name}
                          />
                          {/* <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                            <div id="preview" onMouseMove={zoomIn(Event,image.url)}></div>
                          </div> */}
                        </Carousel.Item>
                      );
                    })}
                </Carousel>
              </div>

              <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">product id: {product._id}</p>

                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">{`(${product.numOfReviews} reviews)`}</span>

                <hr />

                <p id="product_price">{`Rs ${product.price}`}</p>
                <div className="stockCounter d-inline">
                  <span
                    className="btn btn-danger minus btn-sm"
                    onClick={decreaseQty}
                  >
                    -
                  </span>

                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />

                  <span
                    className="btn btn-primary plus btn-sm"
                    onClick={increaseQty}
                  >
                    +
                  </span>
                </div>
                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  disabled={product.stock === 0}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

                <hr />

                <p>
                  Status: <span id="stock_status">In Stock</span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>{product.seller}</strong>
                  </p>
                   
                {user ? (
                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                      data-target="#ratingModal"
                      onClick={()=> navigate("/comingsoon")}
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Login to post your review.
                  </div>
                )}

                <div className="row mt-2 mb-5">
                  <div className="rating w-50">
                    <div
                      className="modal fade"
                      id="ratingModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="ratingModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="ratingModalLabel">
                              Submit Review
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul className="stars">
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                              <li className="star">
                                <i className="fa fa-star"></i>
                              </li>
                            </ul>

                            <textarea
                              name="review"
                              id="review"
                              className="form-control mt-3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            <button
                              className="btn my-3 float-right review-btn px-4 text-white"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
