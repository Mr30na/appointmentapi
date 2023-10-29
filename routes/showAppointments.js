const auth = require("../controller/tokenAuth");
const express = require("express");
const router = express.Router();
const controller = require('../controller/appointments');
const mysql = require("mysql");
const userController = require("../controller/userController");
const dbconnection = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "",
     database: "persons",
});

router.get("/show",auth,(req,res)=>{
     controller.showAppointments(dbconnection).then((reserve)=>{
      res.json({message:"These times are booked",data:{reserve},success:true});
     }).catch(err=>{
          res.json({message:"unexpected error",data:{err},success:false});
     })
})

router.post("/make",auth,(req,res)=>{
     controller.makeAppointment(dbconnection,req.body.date,req.userId).then((bookedtime)=>{
          let attendAt = req.body.date;
          res.json({message:"Your reservation is complete",data:{attendAt},success:true})
     }).catch(err=>{
          switch(err) {
               case 4000:
               res.json({
                    message: "The date format is  invalid or the doctor isn't at the office at this time",
                    data: {},
                    success: false
               })
                  break;
               case 4010:
                    res.json({message:"This date is booked by someone else",
                         data:{},
                         success:false})
                  break;
               default:
                    res.json({message:"unexpected error",data:{err},success:false})

          }
     })
})
module.exports = router;