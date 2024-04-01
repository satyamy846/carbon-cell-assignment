class CustomError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode =  statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'Fail' : 'Server Error';
        //this means error is operational (Server error) and if it is programatical error then we don't send to the message to client
        this.operational = true;
        //this will trace the error (good for debugging)
        Error.captureStackTrace(this, this.CustomError)
    }
}

export default CustomError;