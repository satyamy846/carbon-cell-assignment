const prodErrorResponse = (res, error)=>{
    if(error.isOperational){
        //server error
        res.status(error.statusCode).json({
            statusCode: error.statusCode,
            status: error.status,
            message: error.message
        })
    }
    else{
        // programatical error
        res.status(500).json({
            status:'Error',
            message: "Something went wrong Please try again later."
        })
    }
}

const devErrorResponse = (res, error)=>{
    console.log("error = ", error);
    console.log("res - ", res);

    // error.statusCode ("500") is depricated please use res.status(500)
    res.status(500).json({
        statusCode: error.statusCode,
        status: error.status,
        message: error.message,
        stackTrace: error.stackTrace,
        error: error
    })
}



const globalErrorResponse = (error, req, res,next) =>{
    console.log("saas")
    error.statusCode = error.statusCode || 500;
    error.message = error.message || 'Internal Server Error';
    error.status = error.status;

    if(process.env.NODE_ENV === 'production'){
        prodErrorResponse(res, error);
    }
    else if(process.env.NODE_ENV === 'development'){
        console.log("sssas")
        devErrorResponse(res, error);
    }
}

export default globalErrorResponse;