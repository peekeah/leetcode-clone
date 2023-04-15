const express = require('express');
const submissions = require('../controllers/submissions');


const router = express.Router();

router.get('/', submissions.getSubmissions);
router.post('/add', submissions.createSubmission);


module.exports = router;