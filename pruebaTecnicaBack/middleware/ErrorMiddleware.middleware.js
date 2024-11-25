module.exports = function(err, req, res, next){

    const httpStatus = err.status || 500;

    return res.status(httpStatus).send({
        status: httpStatus,
        message: err.meta || err.message || "Internal server error"
    });

};