function getUsername(dbConnection, userName, password, callback){
     dbConnection.query(`SELECT id,username,fullname,image FROM students WHERE username=? and password=?`, [userName,password], callback);
}

function createUser(dbConnection,userName,fullName,password,email,callback){
     dbConnection.query('INSERT INTO students(id,username,fullname,password,email,otp,otptime) VALUES(NULL,?,?,?,?,"",current_timestamp())',
         [userName,fullName,password,email],
         callback);
}
function getRole(dbConnection,id,callback){
    dbConnection.query('SELECT role FROM students WHERE id=?',[id],callback)
}
module.exports = {getUsername,createUser,getRole}