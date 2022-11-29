const express = require('express')
const router = express.Router();
const ProductController = require('../controller/product.controller');

router.get('/create',ProductController.addproduct)
router.post('/addproduct',ProductController.createProduct)
router.get('/delete/:id',ProductController.deleteProduct)
router.get('/get',ProductController.getAllProduct)
router.get('/',ProductController.usergetAllProduct)
router.post('/search',ProductController.search)
router.get('/updateproduct/:id', ProductController.updateproduct);
router.post('/updateproduct/:id',ProductController.saveupdate);
module.exports = router;
