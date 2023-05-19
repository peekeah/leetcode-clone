const { save, findOne, findMany } = require("../services/typeorm");

exports.addQuestions = async (req, res) => {
    try {
        // saving questoins in db
        await save("questions", req.body);
        res.status(201).send({ message: "Successfully added!" });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.getQuestions = async (req, res, next) => {
    try {
        // getting questions from db
        const questions = await findMany("questions");
        res.send(questions);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

exports.getQuestion = async (req, res) => {
    try {
        // getting question from db
        const question = await findOne("questions", ["id"], [req.params.id]);
        res.send(question);
    } catch (err) {
        console.log(err);
        next(err);
    }
};
