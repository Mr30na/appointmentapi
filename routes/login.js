var express = require('express');
var router = express.Router();
const mysql = require("mysql")
const userController = require("../controller/userController");
const {log} = require("debug");


const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "persons",
});



/* GET users listing. */
router.post('/', function(req, res, next) {

  userController.findUser(dbConnection,req.body.username,req.body.password)
      .then(user=>{
     let token = userController.creatToken(user[0].id)
        user[0].token = token
    res.json({message:`welcome ${user[0].username}`,data:user[0],success:true})
  }).catch((err)=>{
    switch (err) {
      case 3000:
        res.json({message:"username or password is wrong",data:{},success:false})
            break;
      default:
        res.json({message:err,data:{},success:false})
            break;


    }




  })


});

module.exports = router;
