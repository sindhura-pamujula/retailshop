const express = require('express');
const db = require('../../config/database');
const User = require('../../models/User');
const Order = require('../../models/Order');
const Order_Item = require('../../models/Order_Item');
const  Sequelize  = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userauth = require('./auth');
const auth = require('../../middileware/auth');
const Joi = require('@hapi/joi');
const validator = require('express-joi-validation').createValidator({});
const fetch = require('node-fetch');
const config = {
    "jwtSecret":"passSecret"
};

const router = express.Router();


router.get('/',async (req,res)=>{
    const users = await User.findAll({ });
    console.log('users are '+JSON.stringify(users));
    res.send(users);
});
//private
//get all user details and orders.
router.get('/:userid/orders',auth,async(req,res)=>{
    console.log('userid',req.params.userid);
    //console.log('req.user',req.user.id);
      User.hasMany(Order,{
       foreignKey:'user_id'
      });
      //not required
     // Order.User=Order.belongsTo(User,{foreignKey:'user_id'});
      Order.hasMany(Order_Item,{
        foreignKey:'order_id'
      });
      //not required
     // Order_Item.belongsTo(Order,{
     //   foreignKey:'order_id'
     // });
    const user = await User.findAll({
        include: [{
            model: Order,
            include:[{
                model:Order_Item}]
           // it adds members.id to the where clause.it works without foreign key.
           //where: { user_id: Sequelize.col('members.id') }                   
        }],
        where:{id:req.params.userid}
    });
    res.send(user);
   /* db.query("SELECT * FROM members LEFT JOIN orders ON members.id=orders.user_id where members.id=?",
    {
        replacements: [userid],
        type: db.QueryTypes.SELECT
      })
    .then(function(user) {
     console.log('users are '+JSON.stringify(user));
     res.send(user);
    })*/
});
router.post('/register',async (req,res)=>{
    console.log(req.body);
    let {full_name,email,password,gender,date_of_birth}=req.body;
    if(!full_name || !email || !password || !gender || !date_of_birth){
        return res.status(400).json({msg:'please enter all fileds'});
    }
    let user = await User.findAll({where:{email}});
    console.log('user is',JSON.stringify(user));
    user=JSON.parse(JSON.stringify(user));
    if(user[0] != null){
        //res.send(user);
        return res.status(400).json({msg:'user already exists'});
    }
    //create salt and hash
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,(err,hash)=>{
            if(err) throw err;
            password=hash;
            User.create({full_name,email,password,gender,date_of_birth})
            .then(user => {
                console.log(config.jwtSecret);
                jwt.sign(
                        {id:user.id},
                        config.jwtSecret,
                        {expiresIn:3600},
                        (err,token)=>{
                            if(err) throw err;
                            res.json({
                                token,
                                user:{
                                    id:user.id,
                                    name:user.full_name,
                                    email:user.email
                                }
                            });
                        }
                    );
            })
            .catch(err => console.log('err is',err));
        });
    });
   
});
const bodySchema = Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().min(5).max(10).required()
  })

//@desc authenticate user
//normal way
//router.post('/auth',validator.body(bodySchema),userauth.authUser);
//using auth microservice
router.post('/auth',validator.body(bodySchema),async (req,res)=>{
     fetch('http://localhost:3000/',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(req.body),
    })
    .then(response=>{
        res.status(response.status);
        console.log(response);
        response.text().then( (text) =>{
            // do something with the text response
            console.log(text); 
            res.send(JSON.parse(text));
          })
    })
    .catch(err=> console.log(err));
    /*
     const response= await Promise.all(promise);
   const resjson= await response.json();
   res.json({res:response.json()});
  */ 
});
//@private 
router.delete('/delete/:email',auth, (req,res)=>{
    User.destroy({
        where: {
            email: req.params.email
        }
      }).then(() => {
        res.json({msg:"user deleted"});
      });
});

module.exports=router;