const User = require('../models/User');
const express = require('express');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const config = {
    "jwtSecret":"passSecret"
};

const router = express.Router();
  
router.post('/',async (req,res)=>{
    console.log(req.body);
    let {email,password}=req.body;
    let user = await User.findAll({where:{email}});
    console.log('user is',JSON.stringify(user));
    user=JSON.parse(JSON.stringify(user));
    if(user[0] == null){
        //res.send(user);
        return res.status(400).json({msg:'user doesnt  exists'});
    }
    //validate password
    bcrypt.compare(password,user[0].password)
    .then(isMatch=> {
        if(!isMatch) return res.status(400).json({msg:'invalid credentials'});
        jwt.sign(
            {id:user.id},
            config.jwtSecret,
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err;
                res.send({
                    token,
                    user:{
                        id:user[0].id,
                        name:user[0].full_name,
                        email:user[0].email
                    }
                });
            }
        );
    })
 });
 module.exports=router;