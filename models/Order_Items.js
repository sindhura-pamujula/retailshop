const { Sequelize, DataTypes }  = require('sequelize');
const db = require('../config/database');

const Order_Items = db.define('orders', {
  // Model attributes are defined here
    order_id:{
        type:DataTypes.INTEGER ,
    },
    product_id: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    }
});
module.exports = Order_Items;