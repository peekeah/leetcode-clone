class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode || 500;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    
    // Handle other types of errors here
    return res.status(500).send({ message: 'Internal server error' });
  }
  
  module.exports = { CustomError, errorHandler };
  