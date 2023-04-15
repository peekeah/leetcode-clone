const express = require('express');
const questions = require('../controllers/questions');
const { isAdmin } = require('../middlewares/auth');


const router = express.Router();

router.get('/', questions.getQuestions);
router.post('/add', isAdmin, questions.addQuestions);


module.exports = router;