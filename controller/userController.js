const model = require("../model/userModel");
const {log} = require("debug");
const jwt = require("jsonwebtoken");
const {reject} = require("nodemailer/.ncurc");
  require("dotenv").config();

const ERROR = {USER_NOT_FOUND:3000,TAKEN:3010}
const PERMISSION = {ALL:"all",ADMIN:"admin"};
function findUser(dbConnection,username,password,){
    return new Promise((resolve,reject)=>{
        model.getUsername(dbConnection,username,password,(err,result)=>{
            if (err) return reject(err);

            if (result.length === 0) return reject(ERROR.USER_NOT_FOUND)


                resolve(result);




        })

    })

}

function creatToken(id){
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let token= jwt.sign({id},jwtSecretKey,{expiresIn: '1d'});
    return token;

}

function createUser(dbconnection,username,fullname,password,email){
    return new Promise((resolve,reject)=>{
        model.createUser(dbconnection,username,fullname,password,email,(err,result)=>{

            if(err != null && err.errno === 1062) {return reject(ERROR.TAKEN)}
            else if(err){
                return reject(err);
            }
            resolve(result);
        })
    })
}

function getPermission(dbConnection,id){
    return new Promise((resolve,reject)=>{
        model.getRole(dbConnection,id,(err,result)=>{
            if (err) return reject(err);
            resolve(result);
        })
    })


}

module.exports = {findUser,creatToken,createUser, getPermission,PERMISSION}