const express = require('express');
const productsController = require('../../controllers/products');
const router = express.Router();


router.get('/',(req,res)=> res.send('index'));
router.get('/products',productsController.getAllProducts);
router.get('/products/:type',productsController.getProductsByType);

router.post('/product',productsController.insertProduct);

router.put('/product/:id',productsController.updateProduct);

router.delete('/product/:id',productsController.deleteProduct);

module.exports=router;