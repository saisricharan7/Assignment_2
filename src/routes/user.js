const router=require('express').Router();
const User=require('../model/User');
const bcrypt=require('bcrypt')
const dotenv=require('dotenv').config();
var jwt = require('jsonwebtoken');
const bodyParser=require("body-parser")
router.use(bodyParser.json());


router.post('/register',async(req,res)=>{
   
    try{
        const {name,email,password}=req.body;
        console.log(name)
        const usercheck=await User.findOne({email})
        console.log(usercheck)
        if(usercheck){
            res.json({
                message:"user already exits"
            })
        }else{
        const hash=await bcrypt.hash(password,10);
        console.log(hash)
        const newUser=await User.create({
            name:name,
            email:email,
            password:hash
        })
        console.log(newUser)
        res.json({
            status:"success",
            newUser
        })
    }
}catch(e){
        res.json({
            status:"failure",
            Message:e.message
        })
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        console.log(user.password)
       
        if(user){
       var result=await bcrypt.compare(password,user.password)
        }

        const token = jwt.sign({ user_id: user._id },process.env.JWT_SECRET_KEY ,{ expiresIn: "2h",});
        if(result){
          res.status(200).json({
            status:"success",
            token
          })
        }
    }catch(e){
        res.status(401).json({
            status:"failure",
            message:e.message
        })
    }
})

module.exports=router;


