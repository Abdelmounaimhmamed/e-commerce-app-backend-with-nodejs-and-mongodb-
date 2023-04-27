const mongoose = require("mongoose");
const Order = mongoose.Schema({
    userId : {
        type : String,
        
    },
    products : [
        {
            productId : {
                type : String , 
            },
            quantity : {
                type : Number , 
                default : 1 
            }
        }
    ],
    amount : {
        type : Number , 
        required : true
    },
    adresse : {
        type : Object,
        required : true 
    },
    status : {
        type : String, 
        default : "pending"
    }
})


module.exports = mongoose.model("OrderModel" ,Order );