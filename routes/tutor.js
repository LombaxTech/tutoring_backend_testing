const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const { createTutor, getTutors } = require('../controllers/tutor');

router.post('/tutor', createTutor);
router.get('/tutors', getTutors);

module.exports = router;