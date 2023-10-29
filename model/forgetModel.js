function changeOtp(dbConnection,otp,email,callback){
    dbConnection.query('UPDATE students SET otp=MD5(?) WHERE email=?',[otp,email],callback);
}
function getOtpTime(dbConnection,email,callback){
    dbConnection.query(' SELECT (now()-otptime)>120 AS timeDiff FROM students WHERE email=?;',[email],callback)
}
module.exports = {changeOtp,getOtpTime}