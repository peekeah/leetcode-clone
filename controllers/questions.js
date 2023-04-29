const AppDataSource = require("../utils/data-source");
const Questions = require("../entity/questions.entity");

// modify for bulk upload
exports.addQuestions = async(req, res) => {
    try {
        // adding questions in db
        const repo = AppDataSource.getRepository(Questions)
        await repo.save(req.body)
        res.status(201).send({ message: 'Question added successfully!' });
        
    } catch (err) {
        console.log(err)
        next(err)
    }
}

exports.getQuestions = async(req, res) => {
    try {
         // getting questions from db
        const repo = AppDataSource.getRepository(Questions)
        const questions = await repo.find()
    res.send(questions)
    } catch (err) {
        console.log(err)
        next(err)
    }
}


exports.getQuestion = async(req, res) => {
    try {
        // getting question from db
        const repo = AppDataSource.getRepository(Questions)
        const question = await repo.find({ where: { id: req.params.id } })
        res.send(question)
    } catch (err) {
        console.log(err)
        next(err)
    }
}