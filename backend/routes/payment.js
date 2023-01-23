const express = require('express');
const router = express.Router();

const { isAuthenticatedUser } = require('../middlewares/auth');

const {processPayment,sendStripeApi} = require('../controllers/paymentController');

//----------------------------------------------------------------

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApi);






module.exports = router;