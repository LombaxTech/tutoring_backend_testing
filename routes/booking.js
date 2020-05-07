const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutor');
const Student = require('../models/student');
const { createBooking, getBookings } = require('../controllers/booking');

router.post('/booking/:studentName/:tutorName', createBooking)
router.get('/bookings/:tutorName', getBookings)

module.exports = router;