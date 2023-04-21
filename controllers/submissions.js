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

exports.createSubmission = async(req, res) => {
    
    const randomId = Math.floor(Math.random() * 2);

    if(randomId){
        req.body.accepted = true;
    } else {
        req.body.accepted = false;
    }

    // saving into db
    const repo = AppDataSource.getRepository(Submissions)
    await repo.save(req.body)

    // SUBMISSION.push(obj);
    res.send({ data: 'Successfully submitted!' });
}
