// Define a custom error class
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Define a custom error handler function
const customErrorHandler = (err, req, res, next) => {
// Handle the custom error
if (err instanceof CustomError) {
        const { statusCode, message } = err;
        res.status(statusCode).json({ error: message });
    } else {
        // Pass the error to the default error handler
        next(err);
    }
};

module.exports = { CustomError, customErrorHandler };