const express = require('express');
const db = require('../../config/database');
const Product = require('../../models/Product');
const  Sequelize  = require('sequelize');
const Op = Sequelize.Op;
const productsController = require('../../controllers/products');
const router = express.Router();


router.get('/',(req,res)=> res.send('index'));
router.get('/products',productsController.getAllProducts);
///products/:type?limit=10
///products/:type?produtctname=apple?limit=10
///products/:type?paoductname=apple&price[gte]=1000&price[lte]=20000&limit=10
///products/:type?sortby=ascend
router.get('/products/:type',async (req,res)=> {
    console.log("param is"+req.params.type);
    
    const producttype=req.params.type;
    const name = req.query.productname;
    const limitval = req.query.limit;
 
    if(name != undefined && req.query.price != undefined){
        const gtevalue = req.query.price.gte;
        const ltevalue = req.query.price.lte;
        console.log("query params:"+gtevalue,ltevalue,limitval);
        const products = await Product.findAll({
            where:{
                type:producttype,
                productname:name ,
                price:{ 
                    [Op.gte]:gtevalue,
                    [Op.lte]:ltevalue
                }   
            },
                limit:limitval 
            
        });
        console.log('products are '+JSON.stringify(products));
        res.send(products);
    } else if(name != undefined) {
            const products = await Product.findAll({
                where:{
                    type:producttype,
                    productname:name   
                },
                limit:limitval
            });
            console.log('products are '+JSON.stringify(products));
            res.send(products);
    }
    else {
        const products = await Product.findAll({
            where:{
                type:producttype,   
            },
            limit:limitval
        });
        console.log('products are '+JSON.stringify(products));
        res.send(products);
    }
   
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

router.put('/products/:id',(req,res) => {
    console.log(req.params.id); 
    let {type,productname,price,description}=req.body;
    if(price !=undefined)
    Product.update({price},{where:{id:req.params.id}});
    res.send('product updated');
    });

router.delete('/products/:id',(req,res) => {
    console.log(req.params.id); 
    Product.destroy({where:{id:req.params.id}});
    res.send('product deleted');
} );

module.exports=router;