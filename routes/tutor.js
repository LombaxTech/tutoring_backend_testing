const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const { createTutor } = require('../controllers/tutor');

router.post('/tutor', createTutor)

module.exports = router;