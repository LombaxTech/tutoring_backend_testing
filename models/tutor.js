const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    studentName: String,
    subject: String,
    time: Date
})

const tutorSchema = new Schema({
    name: String,
    bookings: [bookingSchema],
    cancelledBookings: [bookingSchema]
})

const tutor = mongoose.model('Tutor', tutorSchema);

module.exports = tutor;