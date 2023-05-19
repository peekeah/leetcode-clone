const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.generateToken = (data) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRY || '7d';
    return jwt.sign(data, secret, { expiresIn });
}

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}