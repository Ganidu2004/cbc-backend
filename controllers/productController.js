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
        res.status(403).json({
            message : error
        })
    })
}

export function getProduct(req,res){
    product.find({}).then((products)=>{
        res.json(products)
    })
}

export function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Please login as administrator to delete product"
        })
        return
    }

    const productId =req.params.productId

    product.deleteOne(
        {productId:productId}
    ).then(()=>{
        res.json({
            message: "Product Deleted"
        })
    }).catch((error)=>{
        res.json(403).json({
            message: error
        })
    })
}

export function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Please login as administrator to delete product"
        })
        return
    }

    const productId = req.params.productId
    const newProductData = req.body

    product.updateOne(
        {productId : productId}.newProductData
    ).then(()=>{
        res.json({
            message:"Product Updated"
        })
    }).catch((err)=>{
        res.status(403).json({message:err})
    })
}