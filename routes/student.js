const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const { createStudent } = require('../controllers/student');

router.post('/student', createStudent);

module.exports = router;