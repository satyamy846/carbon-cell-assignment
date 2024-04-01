const asyncErrorHandler = (callback)=>{
    //we are returning as anonymous function coz it can't be called immediately instead can be called we any user makes a request for this func
    return (req, res, next)=>{
        callback(req, res, next).catch(error => next(error));
    }
}

export default asyncErrorHandler;