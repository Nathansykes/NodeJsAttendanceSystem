//module contains lots of try catches as we don't want the server to crash if something goes wrong
exports.handleError = (res, error) => {
    console.log(error);
    try{
        // get the error status code from the end of the error message prefixed with STATUS_CODE:
        var matched = error.message.match(/STATUS_CODE: (\d+)/);
        if(matched){
            var statusCode = matched[1];
        }
    }
    catch (err){
        console.log(err);
        // do nothing, we'll just use the default status code, we don't ever want the error handler to throw an error itself and cause a process exit
    }

    try{
        res.status(statusCode || 500).send({ message : error?.toString() || "Something went wrong."});
    }
    catch (err){
        console.log(err);
        // if we get here something is likey wrong within res or error, we'll just log the error 
    }
}