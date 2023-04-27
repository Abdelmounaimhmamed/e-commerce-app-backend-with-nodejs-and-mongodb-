const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true
    },
    email :  {
        type : String , 
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false || true
    }
}, {
    timestamp : true
});

module.exports = mongoose.model("UserModel" , UserSchema);