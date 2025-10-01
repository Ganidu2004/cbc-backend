import order from "../models/order.js";
import product from "../models/product.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req,res){

    if(!isCustomer){
        res.json({
            message : "Please login as customer to create orders"
        })
    }
    //take the latest product Id
    try{
        const latestOrder = await order.find().sort({date : -1}).limit(1)

        let orderId;

        if(latestOrder.length == 0){

            orderId = "CBC0001"

        }else{

            const currentOrderId = latestOrder[0].orderId;

            const numberString = currentOrderId.replace("CBC","");

            const number = parseInt(numberString);

            const newNumber = (number + 1).toString().padStart(4,"0");

            orderId = "CBC" + newNumber;

        }

        const newOrderData = req.body

        const newProductArray =[]

        for(let i=0;i<newOrderData.orderItems.length;i++){
            const Product = await product.findOne({
                productId : newOrderData.orderItems[i].productId
            })
 
            if(Product == null){
                res.json({
                    message : "Product with id "+newOrderData.orderItems[i].productId+" not found"  
                })
                return
            }

            newProductArray[i] = {
                name : Product.productName,
                price : Product.lastPrice,
                quentity : newOrderData.orderItems[i].qty,
                image : Product.images[0]
            }
            
        }

        newOrderData.orderItems = newProductArray


        newOrderData.orderId = orderId
        newOrderData.email = req.user.email

        const newOrder = new order(newOrderData)

        const saveOrder = await newOrder.save()

        res.json({
            message : "Order created",
            order : saveOrder
        })

    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

export async function getOrder(req,res) {
    try{
        const orders = await order.find({email : req.user.email})

        res.json(orders)
    }catch{
        res.status(500).json({
            message : error.message
        })
    }
}

export async function getQuote(req,res){
    //take the latest product Id
    try{
        const newOrderData = req.body

        const newProductArray =[]

        let total = 0
        let labeledTotal = 0

        for(let i=0;i<newOrderData.orderItems.length;i++){
            const Product = await product.findOne({
                productId : newOrderData.orderItems[i].productId
            })
 
            if(Product == null){
                res.json({
                    message : "Product with id "+newOrderData.orderItems[i].productId+" not found"  
                })
                return
            }

            labeledTotal += Product.price * newOrderData.orderItems[i].qty
            total += Product.lastPrice * newOrderData.orderItems[i].qty

            newProductArray[i] = {
                name : Product.productName,
                price : Product.lastPrice,
                labeledPrice : Product.price,
                quentity : newOrderData.orderItems[i].qty,
                image : Product.images[0]
            }
            
        }

        newOrderData.orderItems = newProductArray
        newOrderData.total = total

        res.json({
            orderItems:newProductArray,
            total : total,
            labeledTotal :labeledTotal
        })


    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}