const { CustomError } = require("../utils/error");
const jwt = require("jsonwebtoken");

exports.isAdmin = async(req, res, next) => {
    const token = req.headers['access-token'];

    // checking if token exists
    if(!token){
        return res.status(401).send({ message: "Token not found" })
    }
    
    // token validation
    let tokenData;
    try {
        tokenData = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log(err)
        return res.status(401).send({ message: "Invalid Token" })
    }
    
    // admin role validation
    if(tokenData.role !== 'admin'){
        const error = new CustomError("You are not authorized", 401);
        return next(error);
    }

    next();  
}