const AppDataSource = require("../utils/data-source");
const Questions = require("../entity/questions.entity");

exports.addQuestions = async(req, res) => {

    // adding questions in db
    const repo = AppDataSource.getRepository(Questions)
    await repo.save(req.body)

    res.status(201).send({ message: 'Question added successfully!' });
}

exports.getQuestions = async(req, res) => {
    
    // getting questions from db
    const repo = AppDataSource.getRepository(Questions)
    const questions = await repo.find()
    res.send(questions)

}