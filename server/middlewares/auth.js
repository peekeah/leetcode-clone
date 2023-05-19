const { CustomError } = require('../utils/error');
const { verifyToken } = require('../services/jwt');

exports.isAdmin = async(req, res, next) => {
    
    const tokenData = req.body.tokenData;

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
        const err = new CustomError('token not found', 404);
        return next(err);
    }
    
    try {
        const tokenData = verifyToken(token); // token verification

        req.body.tokenData = tokenData; // sending docoded data to controllers
        next();
    } catch (err) {
        console.log(err)
        const error = new CustomError(err.message, 401)
        next(error);

    }
}