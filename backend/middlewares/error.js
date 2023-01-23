const ErrorHandler = require('../utils/errorHandler');
 
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
   
    if(process.env.NODE_ENV==='DEVELOPMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errorMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV==='PRODUCTION'){
        let error = { ...err }
        
//wrong Mongoose object ID error
        if (err.name === 'CastError') {
            const message = `Resource not found ${err.path}`;
            error=new ErrorHandler(message,400)
        }

//handling Mongoose Validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(err => err.message);
            error=new ErrorHandler(message,400)
        }
        
//handling moongose duplicate key errors
        if (err.code === 110000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
            error=new ErrorHandler(message,400)
        }

//handling  wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = `Json web token is invalid please try again!`;
            error=new ErrorHandler(message,400)
        }
//handling  wrong JWT error when it is expired
        if (err.name === 'TokenExpiredError') {
            const message = `Json web token is invalid please try again!`;
            error=new ErrorHandler(message,400)
        }

        error.message = err.message;
        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal server error'
        })
    }

   
}