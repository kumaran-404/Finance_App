const { validationResult } = require("express-validator");
const {ErrorMessage} = require("../utils/handler")

const validator= async(req,res,next)=>{
    
    const {errors} = validationResult(req)


    let err =""

    if(errors.length==0) {
        return next()
    }
    
    for(let error of errors){
        err += error.path +" - "+ error.msg +" , "
    }

    return ErrorMessage(err,res)

}

module.exports = {
    validator 
}