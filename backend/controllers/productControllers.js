
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const crypto = require('crypto')
const cloudinary = require('cloudinary').v2;
//----------------------------------Controller functions--------------------------------------------

//create new product(admin only)---->method => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    
    let images = [];
    if (typeof req.body.images === 'string') { //if multiple images are uploaded
       images.push(req.body.images); 
    }
    else {
        images = req.body.images;  //if one image is uploaded
    }

    let imageLinks = [];
    for (let i = 0; i < images.length; i++) { 
        const result = await cloudinary.uploader.upload(images[i], {
            folder:'products',
        })
        imageLinks.push({
            public_id: result.public_id,
            url:result.secure_url
        })
    }


    req.body.images = imageLinks; //simply adding the imagesLinks to DB
    req.body.user = req.user.id; //simply adding refrence of userId in body

    const product = await Product.create(req.body);
  
    res.status(201).json({
        success: true,
        product
    })
})

//get Products data---->method => api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    
    const resPerPage = 4;  //number of products per page!
    const productsCount = await Product.countDocuments(); //number of  total products in database

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        message: 'This route will show all produts in database',
        count: products.length,
        productsCount,
        products,
        resPerPage
    })
})

//get (ADMIN) Products data---->method => api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
})


//get single products Details by id(given by mongoose) => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('product not found',404));
    }

    res.status(200).json({
        success: "true",
        product
    })
})




//Update product(admin only) => /api/v1/admin/product/:id
//this route will update product details by passing new params, only by ADMIN

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
   
    //first find the object with id:
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: "false",
            message: "product not found!"
        });
    }

    //handling images edits
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.uploader.destroy(product.images[i].public_id);
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: "true",
        product
    })
})


//Delete the product by using its ID => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: "false",
            message: "product not found!"
        });
    }
    // deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) { 
        const result = cloudinary.uploader.destroy(product.images[i].public_id);
    } 



    await product.remove();
    res.status(200).json({
        success: "true",
        message:"product is deleted"
    })
})

//USER reviews, Ratings and comments --------------------------------

//create new review => api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    
    const { rating, comment, productId } = req.body;
    //console.log(req.user);
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    
    res.status(200).json({
        success: true,
        message: 'Product reviews got updated!🤠',
    })

})

//get product reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        message: `Product:${product.name} reviews are as follows 👀:`,
        reviews: product.reviews
    })
})

//delete product reviews => /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() === req.query.id.toString());
    
    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(req.query.id, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'Review deleted successfully 💥'
    })
 })