const express = require('express');
const router = express.Router();

const Tutor = require('../models/tutor');
const { createTutor } = require('../controllers/tutor');

router.post('/tutor', createTutor)

router.post('/tutor/booking/:tutorName', (req, res) => {
    let tutorName = req.params.tutorName;
    Tutor.findOne({ name: tutorName }).exec((err, tutor) => {
        if (err || !tutor) {
            return res.status(400).json({
                error: err
            });
        }

        const { studentName, subject, time, price } = req.body;

        // ! This is only for date in POSTMAN 

        tutor.bookings.push({
            studentName,
            subject,
            time: new Date(time.year, time.month, time.day),
            price
        })

        tutor.save()
            .then(result => res.send(result))
            .catch(err => res.result(err))
    })
})


module.exports = router;