const express = require("express");

const router = express.Router();

const cart_controller = require('../controllers/cartController');

router.post('/addToCart', cart_controller.addToCart);
router.get('/getCartDetails', cart_controller.getCartDetails);



module.exports = router;
