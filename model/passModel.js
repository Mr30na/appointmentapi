const mysql = require('mysql');
function findPass(dbConnection,pass,newPass,userId,callback){
    dbConnection.query('UPDATE students SET password=? where password=? and id=?',[newPass,pass,parseInt(userId)],callback);
}
module.exports = {findPass};