module.exports.authUser= async function (req,res){
    console.log(req.body);
    let {email,password}=req.body;
    if( !email || !password ){
        return res.status(400).json({msg:'please enter all fileds'});
    }
    let user = await User.findAll({where:{email}});
    console.log('user is',JSON.stringify(user));
    user=JSON.parse(JSON.stringify(user));
    if(user[0] == null){
        //res.send(user);
        return res.status(400).json({msg:'user doesnt  exists'});
    }
    //validate password
    bcrypt.compare(password,user.password)
    .then(isMatch=> {
        if(!isMatch) return res.status(400).json({msg:'invalid credentials'});
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
 }