import { json } from "body-parser";
import product from "../models/product.js";
import { isAdmin } from "./userController.js";
import product from "../models/product.js";

export function createProduct(req,res){
    if(!isAdmin(req)){
        res,json({
            message : "Please login as administrator to add product"
        })
        return
    }

    const newProductData = req.body

    const product = new product(newProductData)

    product.save().then(()=>{
        res.json({
            message : "Product created"
        })
    }).catch((error)=>{
        res.json({
            message : error
        })
    })
}

export function getProduct(req,res){
    product.find({}).then((products)=>{
        res.json(products)
    })
}