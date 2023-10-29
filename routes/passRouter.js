const express = require('express')
const mysql = require("mysql");
const auth = require("../controller/tokenAuth");
const router = express.Router();
const changePassCont = require("../controller/changePass");
const changeController = require("../controller/changePass");
const forgetController = require('../controller/forgetController');
const dbConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"persons"
})

router.post('/change',auth,(req,res)=>{
    changeController.find(dbConnection,req.body.password,req.body.newPassword,req.userId).then((result)=>{
        res.json({message:"password was changed successfully",data:{},success:true})
    }).catch(err=>{
        switch (err){
            case 1000:
                res.json({message:"wrong password",data:{},success:false});
                break;

        }

    })
})

router.get('/forget',(req,res)=>{
    forgetController.checkLastUse(dbConnection,req.body.email)
        .then((timeDiff)=> forgetController.find(dbConnection,req.body.email,timeDiff))
        .then((result)=>{

            res.json({message:"otp has sent don't share it with anyone",data:{result},success:true})

        })
        .catch(err=>{
        switch (err) {
            case 2020:
                res.json({message:"Couldn't find any match E-mail",data:{},success:false});
                break;
            case 2021:
                res.json({message:"You have recently received an otp please wait a little",data:{},success:false});
                break;
        }
    })
})

router.get('/lastuse',(req,res)=>{
    forgetController.checkLastUse(dbConnection,req.body.email).then((validationOtp)=>{

        res.json({validationOtp})
    }).catch(err=>{
        switch (err){
            case 2020:
                res.json({message:"invalid email",data:{},success:false})
                break;
        }
    })
})
module.exports = router;