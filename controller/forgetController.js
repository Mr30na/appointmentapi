const model = require("../model/forgetModel");
const ERROR = {UNREGISTER_ERROR:2020,OTP_TOO_EARLY:2021};
const mailer = require('nodemailer');

function checkLastUse(dbConnection,email){
    return new Promise((resolve,reject)=>{



        model.getOtpTime(dbConnection,email,(err,result)=>{
            if(err) return reject(err);
            if(result.length === 0 ){ return reject(ERROR.UNREGISTER_ERROR)}
            if (result[0].timeDiff === 0)return reject(ERROR.OTP_TOO_EARLY);

            resolve();

        })
    })

}
function find(dbConnection,email){
    let otp = Math.floor(Math.random()*10000);
    return new Promise((resolve,reject)=>{
        model.changeOtp(dbConnection,otp,email,(err,result)=>{
            if (err) reject(err);
            if (result.affectedRows === 0)  return reject(ERROR.UNREGISTER_ERROR);
            resolve(otp);

        });
    })
}
module.exports = {find,checkLastUse};