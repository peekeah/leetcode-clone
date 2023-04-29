const AppDataSource = require("../utils/data-source");
const Submissions = require("../entity/submission.entity");

exports.getSubmissions = async(req, res) => {
    try {
        // get all submissions
        const repo = AppDataSource.getRepository(Submissions);
        const submissions = await repo.find();
        res.send({ data: submissions });
    } catch (err) {
        console.log(err);
    }
}


// add controller to get question by id
exports.getSubmission  = async(req, res, next) => {
    try {
        // get submission
        const repo = AppDataSource.getRepository(Submissions);
        const submission = await repo.find({ where: { id: req.params.id } });
        res.send({ data: submission });
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

