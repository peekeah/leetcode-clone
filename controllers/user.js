const { CustomError } = require('../utils/error');
const { findOne, save } = require('../services/typeorm');
const { verifyPassword, hashPassword } = require('../services/bcrypt');
const { generateToken } = require('../services/jwt');

exports.signup = async(req, res, next) => {
    try {
        const existUser = await findOne('users', ['email'], [req.body.email]);
        if(existUser) {
            const error = new CustomError("User alredy exist!", 409);
            return next(error);
        }

        req.body.password = await hashPassword(req.body.password); // password hashing

        await save('users', req.body); // saving data in db

        const token = generateToken(req.body);
        res.status(201).send({ token });
    } catch (err) {
        return next(err);
    }
}

exports.login = async(req, res, next) => {
    try {
        const existUser = await findOne("users", ['email'], [req.body.email]);
        if(!existUser) {
            const error = new CustomError("User doesn't exist", 400);
            return next(error);
        };

        // password validation using bcrpyt
        const matchesPassword = verifyPassword(req.body.password, existUser.password);

        if(!matchesPassword) {
            const err = new CustomError("Password doesn't match", 401);
            return next(err);
        } 

        // token generation using jwt
        const token = generateToken(existUser);
        res.status(200).send({ token });

    } catch (err) {
        console.log(err);
        const error = new Error();
        return next(error);
    }
}