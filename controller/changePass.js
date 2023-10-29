const model = require("../model/passModel");
const ERROR = {WRONG_ERROR:1000}
function find(dbConnection,password,newPass,userId){
    return new Promise((resolve,reject)=> {

        model.findPass(dbConnection, password,newPass,userId, (err, result) => {
            if (err)  return reject(err);
           if (result.affectedRows === 0)  return reject(ERROR.WRONG_ERROR);
           resolve(result)



        })

    })
}

module.exports = {find}