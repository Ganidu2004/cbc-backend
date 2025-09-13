import express from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose'; // import database
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
dotenv.config()

const app = express();

// connected database
const mongodbUrl = process.env.MONGO_DB_URI

app.use(cors())

mongoose.connect(mongodbUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database is connected");
})

// create the middelware to ceparete the body request. 
app.use(bodyParser.json())

// create the middleware to ceparete the json web token
app.use(

    (req,res,next)=>{

        const token = req.header("Authorization")?.replace("Bearer ","")

        if(token != null){
            jwt.verify(token,process.env.SECRET,(error,decode)=>{
                if(!error){
                    req.user = decode
                }
            })
        }

        next()

    }

)

// user root
app.use("/api/users",userRouter)

//product root
app.use("/api/product",productRouter)

//order root
app.use("/api/orders",orderRouter)

app.listen(
    5000,
    ()=>{
        console.log("server is running on port 5000");
    }
)