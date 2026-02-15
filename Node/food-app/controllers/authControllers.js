const userModel = require("../models/userModel");
const bcryptjs=require("bcryptjs");
const JWT= require('jsonwebtoken');
//Register
const registerController= async (req,res)=>{
    try{
        var {username,email,password,address,phone}=req.body;
        //Validation
        if(!username || !email || !password || !address ||!phone){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            });
        }
        //check user
        const existing =await userModel.findOne({email});
        if(existing){
            return res.status(500).send({
                success:false,
                message:"Email already registrered please login"
            })
        }
        //create new user
        var salt = await bcryptjs.genSalt(10);
        const hashedPassword= await bcryptjs.hash(password,salt);
        const user=await userModel.create({username,email,password:hashedPassword,address,phone});
        res.status(201).send({
            success:true,
            message:"User registered"
        });
    }catch(err){
        console.log("error :",err);
        res.status(500).send({
            success:false,
            message:'Error in register api',
            err
        });
    }
}  ;

const loginController=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:"Please provide both Email and Password"
            });
        }    
        //check user
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
               success:false,
               message:'user Not found' 
            });
        }
        //Check user passowrd || compare password
        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){

           return res.status(500).send({
               success:false,
               message:"Invalid Credentials"
            })
        }
        const token = JWT.sign(
        { id: user._id },              // payload
         process.env.JWT_SECRET,        // secret key
        { expiresIn: "7d" }             // expiry
        );

        user.password=undefined;
        res.status(200).send({
            success:true,
            message:"login successfully",
            token,  
            user
        });
    }catch(err){
        console.log("error :",err)
        res.status(500).send({
            success:false,
            mesaage:"Error in Login API",
            err
        })
    }
};

module.exports= {registerController,loginController};
