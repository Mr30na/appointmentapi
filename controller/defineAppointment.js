const model = require("../model/appointments");
const ERRORS = {NOT_EXIST:4000}
function defineAppointment(dbConnection,time){
    return new Promise((resolve,reject)=>{
        model.defineAppointment(dbConnection,time,(err,result)=>{
            if(err) return reject(err);
               resolve(result);
        })

    })
}

function deleteAppointment(dbConnection,time){
    return new Promise((resolve,reject)=>{
        model.deleteAppointment(dbConnection,time,(err,result)=>{
            if(err) return reject(err);
            if(result.affectedRows === 0){
                reject(ERRORS.NOT_EXIST);
            }
            console.log(result.affectedRows);
            resolve(result)
        })
    })
}

module.exports = {defineAppointment,deleteAppointment}