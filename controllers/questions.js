
exports.addQuestions = async(req, res) => {
    
    QUESTIONS.push(req.body);
    res.status(201).send({ message: 'Question added successfully!' });
}

exports.getQuestions = async(req, res) => {
    res.send(QUESTIONS);
}