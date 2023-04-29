const express = require('express');
const submissions = require('../controllers/submissions');
const auth = require('../middlewares/auth')

const router = express.Router();


router.get('/', submissions.getSubmissions);
router.get('/:id', submissions.getSubmission);
router.post('/', auth.isAuthenciated, submissions.createSubmission);


module.exports = router;