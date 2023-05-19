const { CustomError } = require("../utils/error");
const { findMany, save } = require("../services/typeorm");


exports.getSubmissions = async(req, res) => {
    try {
        const userData = req.body.tokenData;
        role = userData.role

        let submissions;
        if(userData.role === "admin"){
            // all submissions by admin
            submissions = await findMany('submissions') 
        } else {
            // all submissions by user
            submissions = await findMany('submissions', ['user.id'], [userData.id]) 
        }

        res.send({ data: submissions });
    } catch (err) {
        console.log(err);
        next(err);
    }
}


exports.getSubmission = async(req, res, next) => {
    try {
        const userData = req.body.tokenData;

        let submission;

        // restricting user only to access their submissions
        if(userData.role === "admin"){
            submission = await findMany('submissions', ['id'], [req.params.id])
        } else {
            submission = await findMany('submissions', ['user.id', 'id'], [userData.id, req.params.id])
        }

        if(submission.length === 0){
            const error = new CustomError("Not found", 404);
            return next(error);
        }
        res.send({ data: submission })
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.createSubmission = async(req, res, next) => {
    try {
        // bulk submit restrict
        if(Array.isArray(req.body)){
            throw new CustomError('Invalid input', 403);
        }

        // generating accept value randomly
        const randomId = Math.floor(Math.random() * 2);
        if(randomId){
            req.body.accepted = true;
        } else {
            req.body.accepted = false;
        }

        // passing userid from converted token data
        req.body.user = req.body.tokenData.id

        // saving into db
        await save('submissions', req.body)
        
        res.send({ data: 'Successfully submitted!' });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

