const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { USERS } = require('../utils/constant');
const { CustomError } = require('../utils/error');

exports.signup = async(req, res) => {
    try {
        const existUser = USERS.find(s => s.email === req.body.email);

        if(existUser) {
            return res.status(409).send({ message: 'User alredy exist!' })  ;
        }

        // adding default role as user
        if(!req.body.role) {
            req.body.role === 'user';
        }

        // password hashing
        const saltRounds = 7; 
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);

        USERS.push(req.body);

        const token = await jwt.sign(req.body, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY || '30d' });

        res.status(201).send({ token });
    } catch (err) {
        console.log(err);
        const error = new Error();
        return next(error);
    }
}

exports.login = async(req, res, next) => {
    try {
        const existUser = USERS.find(s => s.email === req.body.email);
        if(!existUser) {
            const error = new CustomError("User doesn't exist", 409);
            return next(error);
        };

        // password validation using bcrpyt
        const matchesPassword = await bcrypt.compare(req.body.password, existUser.password);

        if(!matchesPassword) {
            // return res.status(401).send({ message: "Password doesn't match" });
            const err = new CustomError("Password doesn't match", 401);
            return next(err);
        } 

        // token generation using jwt
        const token = await jwt.sign(existUser, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY || '30d' });
        
        res.status(200).send({ token });
    } catch (err) {
        console.log(err);
        const error = new Error();
        return next(error);
    }
}