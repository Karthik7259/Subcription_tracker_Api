import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";
import errorMiddleware from "../middlewares/error.middleware.js";
const userRoutes=Router();

userRoutes.get('/',getUsers)
userRoutes.get('/:id',authorize,errorMiddleware,getUser)// :id to get specific
userRoutes.post('/',(req,res)=> res.send({title:'CREATE new user'}))
userRoutes.put('/:id',(req,res)=> res.send({title:'UPDATE user'}))
userRoutes.delete('/:id',(req,res)=> res.send({title:'DELETE USER'}))


export default userRoutes;