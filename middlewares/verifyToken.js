const jwt = require("jsonwebtoken");

const verifyToken = (req,res , next) => {
    const authorization = req.headers.token ;
    if(authorization){
        const token = authorization.split(" ")[1];
        jwt.verify(authorization , process.env.SERIAL , (err , user) => {
            if (err){
                return res.status(400).json({message : "not authorized !"})
            }else{
                req.user = user ;
                next();
            }
        })
    }else{
        return res.status(500).json({message : "not token specified !"});
    }
}


module.exports = {verifyToken};