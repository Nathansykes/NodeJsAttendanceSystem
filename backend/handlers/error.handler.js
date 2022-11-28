exports.handleError = (res, error) => {
    console.log(error);
    // get the error status code from the end of the error message prefixed with STATUS_CODE:
    var matched = error.message.match(/STATUS_CODE: (\d+)/);
    if(matched){
        var statusCode = matched[1];
    }
    res.status(statusCode || 500).send({ message : error?.toString() || "Something went wrong."});
}