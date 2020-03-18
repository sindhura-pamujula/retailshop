
const Product = require('../models/Product');
const  Sequelize  = require('sequelize');
module.exports.getAllProducts = function(req,res) {
    Product.findAll()
    .then((products)=> 
    { 
        console.log('products are '+JSON.stringify(products));
         res.send(products);
    })
    .catch(err => console.log('error in get',err));
};