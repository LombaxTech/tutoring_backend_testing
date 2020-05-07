const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const Student = require('../models/student');
const { createBooking } = require('../controllers/booking');

router.post('/booking/:studentName/:tutorName', createBooking)

router.get('/bookings/:tutorName', (req, res) => {

    let tutorName = req.params.tutorName;

    Tutor.findOne({ name: tutorName }).exec((err, tutor) => {

        if (err) return res.status(400).json({ error: `error of: ${err}` })
        if (!tutor) return res.status(400).json({ error: 'no tutor found' })

        let bookings = tutor.bookings;
        res.send(bookings);

    })

})

module.exports = router;