const Tutor = require('../models/tutor')
const Student = require('../models/student')

exports.createBooking = (req, res) => {

    let tutorName = req.params.tutorName;
    let studentName = req.params.studentName;

    Tutor.findOne({ name: tutorName }).exec((err, tutor) => {

        if (err) return res.status(400).json({ error: 'actual error' })
        if (!tutor) return res.status(400).json({ error: 'no tutor found' })

        let { subject, time } = req.body;

        let booking = {
            studentName,
            subject,
            time: new Date(time.year, time.month, time.day, time.hour)
        }

        tutor.bookings.push(booking)

        tutor.save()
            .then(result => console.log(result))
            .catch(err => res.send(err))

    })

    Student.findOne({ name: studentName }).exec((err, student) => {

        if (err) return res.status(400).json({ error: 'actual error' })
        if (!student) return res.status(400).json({ error: 'no student found' })

        let { subject, time } = req.body;

        let booking = {
            tutorName,
            subject,
            time: new Date(time.year, time.month, time.day, time.hour)
        }

        // res.json({
        //     hour: time.hour,
        //     date: new Date(2020, 4, 7, time.hour).getHours()
        // })

        student.bookings.push(booking)

        student.save()
            .then(result => res.send(result))
            .catch(err => res.send(err))

    })

}

exports.getBookings = (req, res) => {

    let tutorName = req.params.tutorName;

    Tutor.findOne({ name: tutorName }).exec((err, tutor) => {

        if (err) return res.status(400).json({ error: `error of: ${err}` })
        if (!tutor) return res.status(400).json({ error: 'no tutor found' })

        let bookings = tutor.bookings;
        res.send(bookings);

    })

}