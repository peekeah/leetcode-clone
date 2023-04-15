const { USERS } = require('../utils/constant');

exports.signup = async(req, res) => {
    try {
        const existUser = USERS.find(s => s.email === req.body.email);

        if(existUser) {
            return res.status(409).send({ message: 'User alredy exist!' })  ;
        }

        if(req.body.role) {
            req.body.role === 'user';
        }

        USERS.push(req.body);
        res.status(201).send(req.body);
    } catch (err) {
        console.log(err);
    }
}

exports.login = async(req, res) => {
    try {
        const existUser = USERS.find(s => s.email === req.body.email);

        if(!existUser) {
            return res.status(401).send({ message: "user doesn't exist" })
        };

        const matchesPassword = existUser.password === req.body.password;

        if(!matchesPassword) {
            return res.status(401).send({ message: "Password doesn't match" });
        } 

        // token generation
        let token = (Math.random() + 1).toString(36).substring(7);

        // saperate token for admin
        if(existUser.role === 'admin') {
            token = 'admin' + token;
        }

        res.status(200).send({ data: { token } });
    } catch (err) {
        console.log(err);
    }
}