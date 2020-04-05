const express = require('express');
const productsController = require('../../controllers/products');
const router = express.Router();


router.get('/',(req,res)=> res.send('index'));
router.get('/products',productsController.getAllProducts);
router.get('/products/:type',productsController.getProductsByType);

router.post('/products',productsController.insertProduct);

router.put('/products/:id',productsController.updateProduct);

router.delete('/products/:id',productsController.deleteProduct);

module.exports=router;