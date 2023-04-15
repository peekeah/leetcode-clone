const express = require('express');
const questions = require('../controllers/questions');


const router = express.Router();

router.get('/', questions.getQuestions);
router.post('/add', questions.addQuestions);


module.exports = router;