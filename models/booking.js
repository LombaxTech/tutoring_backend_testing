const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    student: {
        studentId: String,
        studentName: String,
    },
    tutor: {
        tutorId: String,
        tutorName: String,
    },
    subject: String,
    time: Date,
    notes: String
    // number of students
})

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = bookingModel;