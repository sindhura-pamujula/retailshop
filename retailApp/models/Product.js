const { Sequelize, DataTypes }  = require('sequelize');
const db = require('../config/database');

const Product = db.define('items', {
  // Model attributes are defined here
  type: {
    type: DataTypes.STRING,
  },
    productname: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
  }
});
module.exports = Product;