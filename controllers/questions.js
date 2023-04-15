const { QUESTIONS } = require('../utils/constant');

exports.addQuestions = async(req, res) => {
    const token = req.headers['token'];
    if(!token){
        return res.status(401).send({ message: 'Token not found' });
    }
    if(!token.match('admin')) {
        return res.status(401).send({ message: 'You are unauthorized to perform this task' });
    }
    QUESTIONS.push(req.body);
    res.status(201).send({ message: 'Question added successfully!' });
}

exports.getQuestions = async(req, res) => {
    res.send(QUESTIONS);
}