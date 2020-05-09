const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const Student = require('../models/student');
const { createBooking, getBookings } = require('../controllers/booking');

router.post('/booking/:studentName/:tutorName', createBooking)
router.get('/bookings/:tutorName', getBookings)
router.post('/booking/remove/:tutorName/:bookingId', (req, res) => {

    const { tutorName, bookingId } = req.params;
    Tutor.findOne({ name: tutorName }).exec((err, tutor) => {

        if (err) return res.status(400).json({ error: 'actual error' })
        if (!tutor) return res.status(400).json({ error: 'no tutor found' })

        let booking = tutor.bookings.id(bookingId);

        if (!booking) return res.status(400).json({ error: `booking does not exist` })

        // TODO: make copy of booking in cancelled bookings of student and tutor
        let studentName = booking.studentName;

        tutor.cancelledBookings.push(booking);

        booking.remove()
        tutor.save((err, result) => {
            if (err) return res.send(`error of: ${err}`)
            res.send(`the following has been deleted: ${result}`);
        })

    })

})

module.exports = router;