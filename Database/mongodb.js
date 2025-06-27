import mongoose from "mongoose";
import {DB_URI,NODE_ENV} from '../config/env.js'

if(!DB_URI){
    console.log("error in database");
}
const connecttoDatabase= async()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`connected to database in ${NODE_ENV}:mode`)
    }catch (error){
        console.log("DBuri",DB_URI)
        console.error("Error connecting to database:",error.message);
    }
}

export default connecttoDatabase