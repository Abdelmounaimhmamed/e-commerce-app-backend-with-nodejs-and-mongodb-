const mongoose = require("mongoose");
const CartSchema = mongoose.Schema({
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
    ]
})


module.exports = mongoose.model("CartModel" ,CartSchema );