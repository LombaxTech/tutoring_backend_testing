const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.post('/student', (req, res) => {
    let student = new Student(req.body);
    student.save()
        .then(result => res.send(result))
        .catch(err => res.send(err));
})

module.exports = router;