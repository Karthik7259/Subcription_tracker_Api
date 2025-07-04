import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECREAT } from "../config/env.js";
 // someone is making a request get user details ->authorize middle ->next->get user details
const authorize = async(req,res,next)=>{
    try{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token) return res.status(401).json({message:"Unauthorized"})
     const decoded=jwt.verify(token,JWT_SECREAT)
    const user=await User.findById(decoded.userId);
    if(!user) return res.status(401).json({message:'Unauthorized'});

    req.user=user;
    next()
    }catch(error){
             res.status(401).json({message:'unauthorized',error:error.message})
            }}

export default authorize;