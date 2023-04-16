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