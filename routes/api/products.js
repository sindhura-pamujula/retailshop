const express = require('express');
const db = require('../../config/database');
const Product = require('../../models/Product');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.get('/',(req,res)=> res.send('index'));
router.get('/products',(req,res)=> {
Product.findAll()
.then((products)=> 
{ 
    console.log('products are '+JSON.stringify(products));
     res.send(products);
})
.catch(err => console.log('error in get',err));
});

router.get('/products/:type',async (req,res)=> {
    console.log("param is"+req.params.type);
    const products = await Product.findAll({
        where:{type:req.params.type}
    });
    console.log('products are '+JSON.stringify(products));
    res.send(products);
});
router.get('/products/:type/?productname=name',async (req,res)=> {
    console.log("param is"+req.params.type);
    console.log("query is"+req.query.productname);
    const products = await Product.findAll({
        where:{type:req.params.type}
    });
    console.log('products are '+JSON.stringify(products));
    res.send(products);
});
router.post('/products',(req,res) => {
    console.log(req.body);
    let {type,productname,price,description}=req.body;
Product.create({type,productname,price,description})
.then(product => {

    console.log('res product'+product);
    res.send(product);
} )
.catch(err => console.log('err is',err));
});
module.exports=router;