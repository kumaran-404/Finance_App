

function SuccessMessage(data,res){
    return res.status(200).json({
        msg : "Success" ,
        error : "",
        data: data 
    }) 
}

function ErrorMessage(error,res){
    return res.status(400).json({
        msg: "",
        error: error ,
        data :"" 
    })
}

module.exports = {
    SuccessMessage , ErrorMessage
}