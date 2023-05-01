const AppDataSource = require("../utils/data-source");
const Submissions = require("../entity/submission.entity");
const { CustomError } = require("../utils/error");


exports.getSubmissions = async(req, res) => {
    try {
        const userData = req.body.tokenData;
        role = userData.role

        // getting all submission for admin & all submissions by user
        let query;
        if(role == "admin"){
            query = {};
        } else {
            query = { where: { "user.id": userData.id } }
        }

        const repo = AppDataSource.getRepository(Submissions);
        const submissions = await repo.find(query);
        res.send({ data: submissions });
    } catch (err) {
        console.log(err);
    }
}


// add controller to get question by id
exports.getSubmission = async(req, res, next) => {
    try {
        const userData = req.body.tokenData;

        let query;
        if(userData.role == "admin"){
            query = { where: { id: req.params.id }};
        } else {
            query = { where: { "user.id": userData.id, id: req.params.id } };
        }

        // get submission
        const repo = AppDataSource.getRepository(Submissions);
        const submission = await repo.find(query);
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

exports.createSubmission = async(req, res) => {
    
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
    const repo = AppDataSource.getRepository(Submissions)
    await repo.save(req.body)

    // SUBMISSION.push(obj);
    res.send({ data: 'Successfully submitted!' });
}

