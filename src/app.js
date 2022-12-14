const express=require('express');
const dotenv=require('dotenv').config();
const app=express();
var jwt=require('jsonwebtoken')


const userRoute=require('./routes/user')
const postRoute=require('./routes/post')
app.use(express.json())
app.use('/posts',(req,res,next)=>{
    console.log(req.headers.authorization)
    if(req.headers.authorization){
        const token=req.headers.authorization?.split(" ")[1];
        console.log(token)
        if(token){
            jwt.verify(token,process.env.JWT_SECRET_KEY,function(err,decoded){
                if(err){
                    return res.status(403).json({
                        status:"failed",
                        message:"not a valid token"
                    })
                }
                console.log(decoded);
                req.user=decoded.user_id;
                next()
            })
        }
    }else{
        return res.status(403).json({
            status:"failed",
            message:"unauthorized"
        })
    }
})

app.use('/',userRoute)
app.use('/posts',postRoute);

module.exports=app;
