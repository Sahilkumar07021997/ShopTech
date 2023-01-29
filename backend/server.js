const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');


//handling Uncaught exceptions: it should be in the very beginning of ur code!
process.on('uncaughtException', err => {
    console.log(`ERROR ${err.stack}`);  //u can also console err.message instead of whole stack.
    console.log('Shutting down the server due to uncaught exception');
    process.exit(1);
})


//setting up config file using when not in PRODUCTION-environment
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: 'backend/config/config.env' });
    console.log("u r in development mode dude");
}

else {
    dotenv.config({ path: 'backend/config/config.env' });
    console.log("u r in production mode dude! just go to localhost:4000");
}

//console.log(a); checking uncaught exception handler

//connecting to DATABASE
connectDatabase();

//setting up Cloudinary configurations
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



app.listen(process.env.PORT, () => {
    console.log(`server started succesfully on PORT: ${process.env.PORT} on ${process.env.NODE_ENV} mode by ${process.env.DEVELOPER}`);
});



//Unhandleds Promise Rejection
process.on('unhandledRejection', function (err){
    console.log(`ERROR: ${err.stack}`);
    console.log('shutting down the server due to unhandled promise rejection');

    server.close(() => {
        process.exit(1);
    });
})
