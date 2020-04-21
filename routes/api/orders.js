const express = require('express');
const db = require('../../config/database');
const Order = require('../../models/Order');
const Order_Item = require('../../models/Order_Item');
const  Sequelize  = require('sequelize');
const router = express.Router();

router.get('/',async (req,res)=>{
    const orders = await Order.findAll({ });
    console.log('orders are '+JSON.stringify(orders));
    res.send(orders);
});

//order for particular user
router.get('/:userId/orderhistory',async (req,res)=>{
    const orders = await Order.findAll({ where:{user_id:req.params.userId}});
    console.log('orders are '+JSON.stringify(orders));
    res.send(orders);
});
//gets all order items for particular order id
router.get('/:orderId',(req,res)=>{
    console.log("req.params.orderId",req.params.orderId);
    let id = req.params.orderId;
   // const orderItems = await Order_Item.findAll({ where:{order_id:req.params.orderId}});
   db.query("SELECT * FROM order_items where order_id=id ", { type: db.QueryTypes.SELECT})
   .then(function(orderItems) {
    console.log('order items are '+JSON.stringify(orderItems));
    res.send(orderItems);
   })
  
});


//posting an order
router.post('/',(req,res)=>{
    console.log(req.body);
    let {user_id,status}=req.body;
    Order.create({user_id,status})
    .then(Order => {
        console.log('res Order'+Order);
        res.send(Order);
    })
    .catch(err => console.log('err is',err));
});

//posting an orderitem
router.post('/:orderId',(req,res)=>{
    console.log(req.body);
    let order_id=req.params.orderId;
    let {product_id,quantity}=req.body;
    Order_Item.create({order_id,product_id,quantity})
    .then(OrderItem => {
        console.log('res Order'+OrderItem);
        res.send(OrderItem);
    })
    .catch(err => console.log('err is',err));
});

module.exports=router;