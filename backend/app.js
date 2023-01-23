const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');


//setting up config file if we are not in PRODUCTION environment
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require('dotenv').config({ path: 'backend/config/config.env' });
}
else {
    dotenv.config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }));




//import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');

app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);
app.use('/api/v1', payment);

if (process.env.NODE_ENV === 'PRODUCTION') { //on production mode it will pick up the build file ie. index.html and can run without running the frontend on localhost 4000
    //Both servers will run on http://localhost:4000/
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    })
}

//Middleware to handle all the errors
app.use(errorMiddleware);


module.exports = app;