const model = require('../model/appointments');
const ERORR = {NOT_FOUND:4000,RESERVED:4010};
function showAppointments(dbconnection){
    return new Promise((resolve,reject)=>{
        model.show(dbconnection,(err,result)=>{
          if(err) return reject(err);
          resolve(result);

        })
    })
}
function makeAppointment(dbconnection,date,userId){
    return new Promise((resolve,reject)=>{
        model.make(dbconnection,date,(err,result)=>{
            if (err) return reject(err);
            if(result.length == 0){return reject(ERORR.NOT_FOUND)}
            if(result[0].bookedby.length != 0){return reject(ERORR.RESERVED)}
            model.save(dbconnection,userId,date,(err,result)=>{
                if (err) return reject(err);
                resolve(result)
            })

        })
    })
}
module.exports = {showAppointments,makeAppointment};