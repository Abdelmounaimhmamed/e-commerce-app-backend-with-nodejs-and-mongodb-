const express = require("express");
const router = express.Router();
const {verifyToken} = require("../middlewares/verifyToken");
const  User = require("../models/User");
const bcrypt = require("bcryptjs");

router.put("/:id" ,verifyToken ,async (req,res ) => {
    if (req.user.id === req.params.id || req.user.isAdmin === true){
        try {
        if(req.body.password){
            const generatedSalt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password , generatedSalt);
            console.log(req.body.password);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id  , 
            { $set : req.body } , {
                new  : true
            });
        res.status(200).json({user : updatedUser});
    } catch (error) {
        res.status(400).json({messageakhy : error.message});
    }
    }else {
        res.status(200).json({message : "not authorizzed !"})
    }
});


router.get("/:id" ,verifyToken ,async (req ,res)  => {
    if (req.user.id === req.params.id &&  req.user.isAdmin === true){
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({message : error.message})
        }
    }else {
        res.status(400).json({message :  "not authorrized to get users , you arn't admin"})
    }
})

router.delete("/:id" , verifyToken , async (req,res) => {
    if (req.user.id === req.params.id || req.user.isAdmin === true ){
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message : "user has been deleted !"});
        } catch (error) {
            res.status(400).json({message : "no user found"});
        }
    }else {
        res.status(400).json({message :  "not authorized !"});
    }
});

router.post("/postuser" , (req,res) => {
    const username = req.body.username ; 
    res.send({name : `your name ${username}`} );
})

module.exports = router;