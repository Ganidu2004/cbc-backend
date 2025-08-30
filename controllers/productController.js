import product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req,res){
    if(!isAdmin(req)){
        res.json({
            message : "Please login as administrator to add product"
        })
        return
    }

    const newProductData = req.body

    const newProduct = new product(newProductData)

    newProduct.save().then(()=>{
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