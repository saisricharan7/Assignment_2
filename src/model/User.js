const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String,unique:true},
    
})

const users=mongoose.model('users',userSchema)

module.exports=users;

