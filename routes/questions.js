const express = require('express');
const questions = require('../controllers/questions');
const auth = require('../middlewares/auth');


const router = express.Router();

router.get('/', questions.getQuestions);
router.post('/add', [auth.isAuthenciated, auth.isAdmin], questions.addQuestions);


module.exports = router;