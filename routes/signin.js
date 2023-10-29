const express =  require("express");
const router = express.Router();
const controller = require('../controller/userController');
const mysql = require("mysql");
const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "persons",
});

router.post('/',(req,res)=>{
   controller.createUser(dbConnection,req.body.username,req.body.fullname,req.body.password,req.body.email).then((creation)=>{
       console.log(creation)
       res.json({message:"welcome",data:creation,success:true})
   }).catch(err=>{
       switch (err){
           case 3010:
               res.json({data:{},message:"username or email is repeated",success:false});
               break;
           default:
               res.json(err)
       }

   })
})

module.exports = router;