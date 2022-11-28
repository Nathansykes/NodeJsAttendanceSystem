exports.handleError = (res, error) => {
    console.log(error);
    // get the error status code from the end of the error message prefixed with STATUS_CODE:
    var statusCode = error.message.match(/STATUS_CODE: (\d+)/)[1];    
    res.status(statusCode || 500).send({ message : error?.toString() || "Something went wrong."});
}