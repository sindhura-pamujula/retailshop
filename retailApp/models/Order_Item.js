const { Sequelize, DataTypes }  = require('sequelize');
const db = require('../config/database');

const Order_Item = db.define('order_items', {
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
Order_Item.associate = models =>{
    Order_Item.belongsTo(models.Order,{
      foreignKey:{
          allowNull:false
      }
    });
  };

module.exports = Order_Item;