
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
///products/:type?sortby=productname

module.exports.getProductsByType= async function (req,res) {
    const producttype=req.params.type;
    let name = (req.query.productname == undefined) ? '%' : req.query.productname+'%';
    let limitval = (req.query.limit == undefined)?20:req.query.limit;
    let id = req.query.id;
    let ltevalue = Number.MAX_SAFE_INTEGER;
    let gtevalue = 1;
    let sortby = req.query.sortby;
    let queryorder =[[]];
    if( req.query.price != undefined){
        if(req.query.price.lte != undefined)
        ltevalue = req.query.price.lte;
        if(req.query.price.gte != undefined)
        gtevalue = req.query.price.gte;
    }
    query={
        type:producttype,
        productname:{
            [Op.iLike]:name
        } ,
        price:{ 
            [Op.gte]:gtevalue,
            [Op.lte]:ltevalue
        }
    }
    if(req.query.id != undefined){
        query.id=req.query.id;
    }
    if(sortby != undefined){
        let sortType='ASC';
        if(req.query.sorttype != undefined)
        sortType=req.query.sorttype;
            let sortArray=sortby.split(',');
            console.log(sortArray);
            sortArray.forEach((element,i)=>{ queryorder[i]=[element,sortType]});
            console.log(queryorder);
           // queryorder[0]=[sortby,'ASC'];  
    }
    else{
        queryorder[0]=['id','DESC'];  
    }
    const products = await Product.findAll({
        where:query,
        order:queryorder
    });
    console.log('products are '+JSON.stringify(products));
    res.send(products);
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