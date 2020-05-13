const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const config = {
    "jwtSecret":"passSecret"
};
/* 
//using middileware authorisation
function auth(req,res,next){
const token = req.header('x-auth-token');
//check for token
if(!token)  res.status(401).json({msg:'no token unauthorised'});
try{
    //verify token
    const decoded = jwt.verify(token,config.jwtSecret);
    console.log('decoded is',decoded);
    req.user=decoded;
    next();
    }catch(e){
        res.status(400).json({msg:'invalid token'});
    }
   /* jwt.verify(token,config.jwtSecret,(err,verified)=>{
        if(err){
            console.log(err); // Token has expired, has been tampered with, etc
          }else{
            console.log(verified); // Will contain the header and body
          }
        
    });
} */
function auth(req,res,next){
    fetch('http://localhost:3000/',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'x-auth-token': req.header('x-auth-token'),
        },
        
    })
    .then(response=>{
        res.status(response.status);
        console.log(response);
        if(response.status != 200){
        response.text().then( (text) =>{
            // do something with the text response
            console.log(text); 
            res.send(JSON.parse(text));
          })
        }
        else{
            next();
        }
    })
    .catch(err=> console.log(err));
}
module.exports=auth;