//this is Error handler class

class ErrorHandler extends Error{

    constructor(message, statusCode) {
        super(message);       //super keyword calling the (parent)Error class constructor
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
        //captureStackTrace method is from parent classs (Error) which is used to trace the error by passing this error object and its constructor func.
    }
}

module.exports = ErrorHandler;