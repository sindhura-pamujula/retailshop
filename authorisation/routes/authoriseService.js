const express = require('express');

const jwt = require('jsonwebtoken');
const config = {
    "jwtSecret":"passSecret"
};

const router = express.Router();


router.get('/',async (req,res)=>{
    const token = req.header('x-auth-token');
    //check for token
    if(!token)  res.status(401).json({msg:'no token unauthorised'});
    try{
        //verify token
        const decoded = jwt.verify(token,config.jwtSecret);
        console.log('decoded is',decoded);
        req.user=decoded;
        res.status(200).json({msg:'valid token'});
        }catch(e){
            res.status(400).json({msg:'invalid token'});
        }
});
module.exports=router;