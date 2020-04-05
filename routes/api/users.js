const express = require('express');
const db = require('../../config/database');
const User = require('../../models/User');
const  Sequelize  = require('sequelize');
const router = express.Router();


router.get('/',async (req,res)=>{
    const users = await User.findAll({ });
    console.log('users are '+JSON.stringify(users));
    res.send(users);
});
router.post('/',(req,res)=>{
    console.log(req.body);
    let {full_name,email,gender,date_of_birth}=req.body;
    User.create({full_name,email,gender,date_of_birth})
    .then(user => {
        console.log('res user'+user);
        res.send(user);
    })
    .catch(err => console.log('err is',err));
});

module.exports=router;