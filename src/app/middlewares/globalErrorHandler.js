
const globalErrorHandler = (
    err,
    req,
    res,
    next
) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something Went Wrong';

    return res.status(statusCode).json({
        success: false,
        message,
        error: err,
    });
};

module.exports = globalErrorHandler;
