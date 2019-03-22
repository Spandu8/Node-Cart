const express = require("express");

const router = express.Router();

const product_controller = require('../controllers/productController');

router.post('/addProduct', product_controller.addProduct);
router.get('/getProducts', product_controller.getAllProducts);

module.exports = router;
