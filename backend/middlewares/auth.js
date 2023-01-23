// this auth middleware is to protect Routes from unauthorized user! and only allows if it is authenticated
const jwt= require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/user");

//--------------------------------------------------------------------------------
// it will basically check if the user is authenticated or not 
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    
    const { token } = req.cookies;

    //console.log(token); getting JWTtoken from cookies!
    if (!token) {
        return next(new ErrorHandler('Login first to access the resource',401))
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.user = await User.findById(decoded.id);

    next(); // next to moveon!
})

//authorized the access according to the user and and admin roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // console.log(req.user.role);
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role ${req.user.role} is not authorized to access the resource`, 403)
            );
        }
        next();
    }
}