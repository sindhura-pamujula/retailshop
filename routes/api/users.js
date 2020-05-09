const express = require('express');
const db = require('../../config/database');
const User = require('../../models/User');
const Order = require('../../models/Order');
const Order_Item = require('../../models/Order_Item');
const  Sequelize  = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const config = {
    "jwtSecret":"passSecret"
};

const router = express.Router();


router.get('/',async (req,res)=>{
    const users = await User.findAll({ });
    console.log('users are '+JSON.stringify(users));
    res.send(users);
});
//get all user details and orders.
router.get('/:userid/orders',async(req,res)=>{
    console.log('userid',req.params.userid);
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
//@desc authenticate user
router.post('/auth',auth.authUser);
router.delete('/delete/:email', (req,res)=>{
    User.destroy({
        where: {
            email: req.params.email
        }
      }).then(() => {
        res.json({msg:"user deleted"});
      });
});

module.exports=router;