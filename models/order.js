import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderID : {
        type : String,
        unique : true
    },
    email : {
        type : String,
        required : true
    }, 
    orderName : {
        type : String,
        required : true
    },
    orderItems : [
        {
            name : {
                type : String,
                required : true
            },
            price : {
                type : String,
                required : true
            },quentity : { 
                type : Number,
                required : true
            },
            image : {
                type : String,
                required : true
            }

        }
    ],
    date : { 
        type : Date,
        default : Date.now
    },
    paymentId : { 
        type : String
    },
    status : {
        type : String,
        default : "Preparing"
    },
    notes : {
        type : String
    },
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    }
})

const order = mongoose.model("orders",orderSchema)

export default order;