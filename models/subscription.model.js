import mongoose from "mongoose";

const  SubscriptionSchema=new mongoose.Schema({
 name:{
    type:String,
    required:[true,'subscripition name is required'],
    trim:true,
    minlength:2,
    maxlength:50
 },
 price : {
    type:Number,
    required:[true,'Subcription price is required'],
    min: [0,'price must be greater than 0'],
 },
currency:{
 type: String,
 enum:['USD','EUR','GBP'],
 default:'USD',
 },
frequency:{
    type:String,
    enum:['daily','weekly','monthly','yearly']
 },
 category:{
    type:String,
    enum:['sports','news','technology'],
    required:true,
 },
 paymentMethod:{
    type:String,
    required:true,
    trim:true,
 },
 status:{
    type:String,
    enum:['active','cancelled','exprired'],
    default:'active',
 },
 startDate:{
    type:Date,
    required:true,
    validate:{
        validator: (value)=> value < new Date(),
        message: 'Start date must be in the past',
    }
 },
 renewalDate:{
    type:Date,
    validate:{
        validator: function (value){
            return this.startDate && value > this.startDate; // ✅ Ensuring `this.startDate` exists
        },
        message: 'renewal date must be in the start data',
    }
 },
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User',
  required:true,
  index:true,
 }
},{timestamps:true});


SubscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        };

        this.renewalDate=new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate()+renewalPeriods[this.frequency]);
    }


    if(this.renwalDate < new Date()){
        this.status='expried';
    }
    next();
})

const Subcription=mongoose.model('Subcription',SubscriptionSchema);

export default Subcription;
//
