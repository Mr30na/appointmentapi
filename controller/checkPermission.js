const controller = require('../controller/userController');
function checkPermission(dbConnection, allowedPermissions){
    return function(req,res,next){
        const userId = req.userId;

        controller.getPermission(dbConnection,userId).then(userPermission=>{
             req.userPermission = userPermission;
            if(allowedPermissions === controller.PERMISSION.ALL) next();
            else if(userPermission[0].role === controller.PERMISSION.ADMIN)
                next();
            else
                res.status(403).json({message:"You don't have the permission to access this service",data:{},success:true});
        })
    }
}
module.exports = {checkPermission}