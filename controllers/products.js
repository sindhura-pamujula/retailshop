
const db = require('../config/database');
const Product = require('../models/Product');
const  Sequelize  = require('sequelize');
const Op = Sequelize.Op;
module.exports.getAllProducts = function(req,res) {
    Product.findAll()
    .then((products)=> 
    { 
        console.log('products are '+JSON.stringify(products));
         res.send(products);
    })
    .catch(err => console.log('error in get',err));
};
///products/:type?paoductname=apple&price[gte]=1000&price[lte]=20000&limit=10
///products/:type?produtctname=apple&limit=10
///products/:type?limit=10
///products/:type?sortby=ascend

module.exports.getProductsByType= async function (req,res) {
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
};

module.exports.insertProduct=function (req,res){
    console.log(req.body);
    let {type,productname,price,description}=req.body;
    Product.create({type,productname,price,description})
    .then(product => {
        console.log('res product'+product);
        res.send(product);
    })
    .catch(err => console.log('err is',err));
};

module.exports.updateProduct = function (req,res) {
    console.log(req.params.id); 
    let {type,productname,price,description}=req.body;
    if(price !=undefined)
        Product.update({price},{where:{id:req.params.id}});
    res.send('product updated');
};

module.exports.deleteProduct = function (req,res){
    console.log(req.params.id); 
    Product.destroy({where:{id:req.params.id}});
    res.send('product deleted');
} ;