const { Sequelize, DataTypes }  = require('sequelize');
const db = require('../config/database');

const User = db.define('members', {
  // Model attributes are defined here
    id:{
        type:DataTypes.INTEGER ,
        autoIncrement: true,
        primaryKey: true
    },
  full_name: {
    type: DataTypes.STRING,
    allowNull:false
  },
    email: {
    type: DataTypes.STRING,
    allowNull:false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull:false
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull:false
  }
});
module.exports = User;