const AppDataSource = require("../utils/data-source");
const Questions = require("../entity/questions.entity");

exports.addQuestions = async(req, res) => {

    // adding questions in db
    const repo = AppDataSource.getRepository(Questions)
    await repo.save(req.body)

    res.status(201).send({ message: 'Question added successfully!' });
}

exports.getQuestions = async(req, res) => {
    res.send("QUESTIONS");
}