const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils/error');
const AppDataSource = require('../utils/data-source');
const Users = require('../entity/user.entity');

exports.signup = async(req, res, next) => {
    try {
        // existing user validation
        const repo = AppDataSource.getRepository(Users);

        const existUser = await repo.findOne({
            where: { email: req.body.email }
        })

        if(existUser) {
            const error = new CustomError("User alredy exist!", 409);
            return next(error);
        }

        // password hashing
        const saltRounds = 7; 
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);

        // saving data in db
        await repo.save({ ...req.body });

        const token = jwt.sign(req.body, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY || '30d' });

        res.status(201).send({ token });
    } catch (err) {
        return next(err);
    }
}

exports.login = async(req, res, next) => {
    try {
        // validate user in db
        const repo = AppDataSource.getRepository("users");
        const existUser = await repo.findOne({
            where: { email: req.body.email }
        })
        if(!existUser) {
            const error = new CustomError("User doesn't exist", 400);
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