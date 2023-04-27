const express  = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
const Port = process.env.PORT || 5000 ;
const userRouter = require("./routes/users.js");
const CartRouter = require("./routes/cart.js");
const ProductRouter = require("./routes/Product.js");
const OrderRouter = require("./routes/order.js");
const authRouter = require("./routes/auth.js");

// setup middlewares : 
app.use(express.json());


mongoose.connect(process.env.DB_URI).then(() => {
    console.log("Connected to the dataBase !")
}).catch((err) => {
    console.log({message : err.message});
});

//routes : 

app.use("/user" , userRouter);
app.use("/product" , ProductRouter);
app.use("/order" , OrderRouter);
app.use("/cart" , CartRouter);
app.use("/auth" , authRouter);


app.listen(Port , () =>{
    console.log(`App running on Port ${Port}`);
})