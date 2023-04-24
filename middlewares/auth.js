const { CustomError } = require("../utils/error");
const jwt = require("jsonwebtoken");

exports.isAdmin = async(req, res, next) => {
    const token = req.headers['access-token'];

    // checking if token exists
    if(!token){
        const error = new CustomError('Token not found', 400);
        return next(error);
    }
    
    // token validation
    let tokenData;
    try {
        tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log(err)
        const error = new CustomError('Invalid Token', 401);
        return next(error);
    }
    
    // admin role validation
    if(tokenData.role !== 'admin'){
        const error = new CustomError('You are not authorized', 401);
        return next(error);
    }

    next();  
}

exports.isAuthenciated = async(req, res, next) => {
    // token validation
    const token = req.headers['access-token'];
    
    if(!token){
        const err = new CustomError("token not found", 404);
        return next(err);
    }
    
    try {
        // token verification
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)

        req.body.tokenData = tokenData;
        next();
    } catch (err) {
        console.log(err)
        const error = new CustomError(err.message, 401)
        next(error);

    }
}