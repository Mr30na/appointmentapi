function show(dbConnection,callback){
    dbConnection.query('SELECT reserveddates FROM reserved WHERE NOT bookedby=""',callback);
}
function make(dbConnection,date,callback){
    dbConnection.query('SELECT bookedby FROM reserved WHERE reserveddates=?',[date],callback)
}
function save(dbConnection,userId,date,callback){
    const q = " UPDATE reserved SET bookedby=? WHERE reserveddates=? AND (SELECT walletbalance FROM students WHERE id=?) >= fee";
    const values = [userId,userId,date]
    dbConnection.query(q,values,callback)
}
function defineAppointment(dbConnection,time,callback){
    dbConnection.query('INSERT INTO reserved (reserveddates,bookedby) VALUES(?,"")',[time],callback)
}

function deleteAppointment(dbConnection,time,callback){
    dbConnection.query('DELETE FROM reserved WHERE reserveddates=?',[time],callback)
}
function checkBalance(dbConnection,time,callback){
    dbConnection.query('')
}
module.exports = {show,make,save,defineAppointment,deleteAppointment};