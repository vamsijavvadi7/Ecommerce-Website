const express = require('express');
const { createProduct, getAllProducts, getSingleProduct, deleteProduct } = require('../controller/productCtrl');
const router = express.Router();

router.post('/add', createProduct);
router.get('/getallproducts', getAllProducts);
router.post('/getsingleproduct', getSingleProduct);
router.delete('/delete', deleteProduct);  // Ensure this route is included

module.exports = router;
