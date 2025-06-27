import { SERVER_URL } from "../config/env.js";
import Subcription from "../models/subscription.model.js";
import {workflowClient} from  '../config/Qtash.js'
// export const createSubscription= async (req,res,next)=>{
//     try{
//         const subscription= await Subcription.create({
//             ...req.body,
//             user:req.user._id,
//         })
//    const {workflowRunId} =await workflowClient.trigger({
//         url:"http://localhost:7000/api/v1/workflow/subscription/reminder",
//         // url:"https://ten-hoops-wonder.loca.lt/workflow/subscription/reminder",
//         body:{
//             subscripitionId:subscription.id,
//         },
//         headers:{
//             'content-type':'application/json',
//         },
//         retries:0,
//     })

//     res.status(201).json({success:true,data:{subscription,workflowRunId}});
//     }catch(error){;
//        next(error)
//     }
// }
export const createSubscription = async (req, res, next) => {
    try {
        // Step 1: Create the subscription
        const subscription = await Subcription.create({
            ...req.body,
            user: req.user._id,
        });

        console.log("Subscription created:", subscription);  // Log the created subscription for debugging

        // Step 2: Trigger the workflow
        try {
            const response = await workflowClient.trigger({
                url: "http://localhost:7000/api/v1/workflow/subscription/reminder",  // Make sure the URL is correct
                body: {
                    subscriptionId: subscription.id,  // Send the subscription ID
                },
                headers: {
                    'content-type': 'application/json',  // Set the content type to JSON
                },
                retries: 0,
            });

            // Log the successful response from the workflow client
            console.log("Workflow triggered successfully. Response:", response);
            const { workflowRunId } = response;

            // Send the response back to the client
            res.status(201).json({
                success: true,
                data: { subscription, workflowRunId }
            });
        } catch (workflowError) {
            // Log the error message if the workflow trigger fails
            console.error("Error triggering workflow:", workflowError);
            return next(workflowError);  // Pass the error to the error handler
        }

    } catch (error) {
        // Log any other errors that occur during subscription creation
        console.error("Error creating subscription:", error);
        next(error);  // Pass the error to the error handler
    }
};

export const getUserSubscriptions=async(req,res,next)=>{
    try{
        if(req.user.id !== req.params.id){
            const error= new Error('you are not the owner of this account');
            error.status=401;
            throw error;

        }
        const subscripition=await Subcription.find({user: req.params.id})
     res.status(200).json({success:true,data:subscripition});
    }catch(e){
      next(e);
    }
}

//// own implementation

export const getSubscriptions=async(req,res,next)=>{
    try{
      const subcription= await Subcription.find();
      res.status(200).json({success:true,data:subcription});
        }catch(error){
    next(error);
    }
}
export const getSubscription= async(req,res,next)=>{
    try{
      const user= await Subcription.findById(req.params.id);
     if(!user){
        const error=new error('user not found',404)
        error.statusCode=404;
        throw error;
     }
     res.status(200).json({success:true,data:user});
        }catch(error){
    next(error);
    }
}