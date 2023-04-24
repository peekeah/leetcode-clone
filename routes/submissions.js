const express = require('express');
const submissions = require('../controllers/submissions');
const auth = require('../middlewares/auth')

const router = express.Router();

router.get('/', submissions.getSubmissions);
router.post('/add', auth.isAuthenciated, submissions.createSubmission);


module.exports = router;