import express from 'express';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose'; // import database
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt, { decode } from "jsonwebtoken";

const app = express();

// connected database
const mongodbUrl = "mongodb+srv://ganidu:16589@cluster0.beglt4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

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

        const token = req.header("Authorization")?.replace("Bearer","")

        if(token != null){
            jwt.verify(token,"hgck16589",(error,decode)=>{
                if(!error){
                    req.user = decode
                }
            })
        }

        next()

    }

)

// product root
app.use("/api/products",productRouter)

// user root
app.use("/api/users",userRouter)

app.listen(
    5000,
    ()=>{
        console.log("server is running on port 5000");
    }
)