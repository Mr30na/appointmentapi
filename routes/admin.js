const auth = require("../controller/tokenAuth");
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const permissionCheck = require('../controller/checkPermission')
const defineController = require("../controller/defineAppointment")
const dbConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"persons"
})

router.post("/defineappointment",auth,permissionCheck.checkPermission(dbConnection,"admin"),(req,res)=>{
        defineController.defineAppointment(dbConnection,req.body.time).then(result=>{
            if (result.affectedRows === 1)
                res.json({message:`Appointment successfully scheduled on ${req.body.time}`,data:{},success:true});
        }).catch(err=>{
            res.send(err)
        })
})

router.delete("/deleteappointment",auth,permissionCheck.checkPermission(dbConnection,"admin"),(req,res)=>{
       defineController.deleteAppointment(dbConnection,req.body.time).then(result=>{
           res.json({message:`Appointment successfully on ${req.body.time} deleted`,data:{},success:true});
       }).catch(err=>{
           switch (err) {
               case 4000:
                   res.json({message:"This time wasn't booked",data:{},success:false});
                   break;
               default:
                   res.send(err);
                   break;


           }
           res.send(err)
       })
})

module.exports = router