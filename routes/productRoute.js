const express = require("express");

const router = express.Router();



const product_controller = require('../controllers/productController');

router.post('/addProduct', product_controller.addProduct);
router.get('/getProducts', product_controller.getAllProducts);
router.put('/updateProduct', product_controller.updateProduct);
router.delete('/deleteProduct', product_controller.deleteProduct);



module.exports = router;
