const Tutor = require('../models/tutor')
const Student = require('../models/student')

exports.createBooking = async (req, res) => {

    let tutorName = req.params.tutorName;
    let studentName = req.params.studentName;

    try {
        const tutor = await Tutor.findOne({ name: tutorName });
        const student = await Student.findOne({ name: studentName });

        if (!tutor) return res.status(400).json({ error: 'no tutor found' })
        if (!student) return res.status(400).json({ error: 'no student found' })

        let { subject, time } = req.body;
        let booking = {
            studentName,
            subject,
            time: new Date(time.year, time.month, time.day, time.hour)
        }

        tutor.bookings.push(booking)
        let savedBooking = await tutor.save()
        student.bookings.push(booking)
        savedBooking = await student.save()

        res.send('successful saving of booking')
    } catch (error) {
        res.send(`error of: ${error}`)
    }

}

exports.getBookings = async (req, res) => {

    let tutorName = req.params.tutorName;
    try {
        let tutor = await Tutor.findOne({ name: tutorName });
        if (!tutor) return res.status(400).json({ error: 'no tutor found' })
        let bookings = tutor.bookings;
        res.send(bookings);

    } catch (error) {
        return res.status(400).json({ error: `error of: ${err}` })
    }

}