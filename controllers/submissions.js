const { SUBMISSION } = require('../utils/constant');


exports.getSubmissions = async(req, res) => {
    try {
        res.send({ data: SUBMISSION });
    } catch (err) {
        console.log(err);
    }
}

exports.createSubmission = async(req, res) => {
    
    const randomId = Math.floor(Math.random() * 2);

    let obj = { code: req.body.code };

    if(randomId){
        obj.status = 'accepted';
    } else {
        obj.status = 'rejected';
    }

    SUBMISSION.push(obj);
    res.send({ data: obj });
}
