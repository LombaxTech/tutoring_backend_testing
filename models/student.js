const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    tutorName: String,
    subject: String,
    time: Date
})

const studentSchema = new Schema({
    name: String,
    bookings: [bookingSchema]
})

const studentModel = mongoose.model('student', studentSchema);

module.exports = studentModel;