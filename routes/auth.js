const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");



router.post("/register" ,async  (req,res) => {
    const {username , email , password} = req.body; 
    const generatedSAlt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(password , 10);
    
    const newUser = new User({
        username : username , 
        email  : email , 
        password : hashedpassword 
    });
    try {
        const user = await newUser.save();
        res.status(200).send({user : user});
    } catch (error) {
        res.status(500).send({message : error.message}) ;
    }
});


router.post("/login" ,async (req,res) => {
    const {email , password} = req.body ;
    try {
        const user = await User.findOne({email});
        !user && res.status(500).json({message : "USer not found with this email !"});   
        const isPassword  = bcrypt.compareSync(password , user.password);
        !isPassword && res.json({message :"wrong password"});
        
        const generatedToken = jwt.sign({
            id : user._id ,
            isAdmin : user.isAdmin
        } , process.env.SERIAL , {
            expiresIn : "30d"
        });


        res.status(200).json({user , generatedToken});
    } catch (error) {
        res.status(500).json({message : error.message});
    }

});



module.exports = router;