exports.handleError = (res, error) => {
    console.log(error);
    res.send({ message : error.toString()});
}