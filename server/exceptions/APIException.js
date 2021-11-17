class APIException extends Error{
       constructor(status,message) {
           super();
           this.status = status;
           this.message = message;
       }

       static BadRequest(message){
           return new APIException(404,message);
       }
       static fatal(message){
           return new APIException(500,message);
       }

}
module.exports = APIException;