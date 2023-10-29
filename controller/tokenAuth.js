const jwt = require("jsonwebtoken");
const userController = require("../controller/userController")
const userModel = require("../model/userModel")
const {checkRole} = require("../model/userModel");

function auth(req,res,next){

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    try{
        let token = req.headers.tokenheaderkey;
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            req.userId = verified.id;
            return next();
        }

    }catch(err){
        if(err.name =="JsonWebTokenError"){
            res.json({message:"unathorized request",data:{},success:false});
        }
        else{
            res.send(err)
        }

    }
}

module.exports = auth