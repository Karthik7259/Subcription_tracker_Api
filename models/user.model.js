import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,'user name required'],
        trim:'true',
        minlength:2,
        maxlength:50,
    },
    email:{
        type: String,
        required : [true,"user Email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        matmatch: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password:{
        type: String,
        required:[true,'user passowrd is required'],
        minlength:6,
    }
},{timestamps:true});

const User=mongoose.model('User',userSchema);

export default User;