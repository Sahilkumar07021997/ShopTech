const express = require('express');
const router = express.Router();


const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
deleteReview} = require('../controllers/productControllers');

const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');
    
//defining  Routes------>>>>>
router.route('/products').get(getProducts);  //get all products detail

router.route('/admin/products').get(getAdminProducts);  //get all products detail

router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);  //post new product

router.route('/product/:id').get(getSingleProduct); // get details of a single product by id:

router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct);  //update the details of a particular product which is being found by ID

router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct); //delete the product with given ID.

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
                        .delete(isAuthenticatedUser, deleteReview);

module.exports = router;