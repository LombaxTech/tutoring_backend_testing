const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const Student = require('../models/student');
const { createBooking, getBookings, removeBooking, removeAllBookings } = require('../controllers/booking');

const Booking = require('../models/booking');

router.post('/booking/:studentName/:tutorName', createBooking);
router.get('/bookings/:tutorName', getBookings);
router.post('/booking/remove/:tutorName/:bookingId', removeBooking);
router.post('/bookings/remove/:tutorName', removeAllBookings);

module.exports = router;