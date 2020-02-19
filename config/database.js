const  Sequelize  = require('sequelize');

module.exports= new Sequelize('retailShop', 'postgres', 'sindhu1234', {
    host: 'localhost',
    dialect:  'postgres' 
  });