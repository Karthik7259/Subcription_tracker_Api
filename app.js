import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subcription.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import connecttoDatabase from "./Database/mongodb.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/Workflow.routes.js";

const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(arcjetMiddleware);

// api/v1/auth/signup
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/subscription', subscriptionRouter)
app.use('/api/v1/workflow', workflowRouter)


app.use(errorMiddleware);
app.get('/',(req,res)=>{
  res.send('welcome to homepage');
})

app.listen(7000, async ()=>{
    console.log(`Subsciption Tracker api is working on`);
    await connecttoDatabase()
   })

export default app;