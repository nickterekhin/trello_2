const APIException = require('../exceptions/APIException')

module.exports = function(err,req,res,next){
    if(err instanceof APIException)
        return res.status(err.status).json({message:err.message});

    return res.status(500).json({message:"Server Error"});
}