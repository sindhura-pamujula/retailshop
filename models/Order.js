const { Sequelize, DataTypes }  = require('sequelize');
const db = require('../config/database');

const Order = db.define('orders', {
  // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER ,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    }
});

  module.exports = Order;