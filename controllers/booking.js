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

        let studentBooking = {
            tutorName,
            subject,
            time: new Date(time.year, time.month, time.day, time.hour)
        }

        let tutorBooking = {
            studentName,
            subject,
            time: new Date(time.year, time.month, time.day, time.hour)
        }

        // let studentBooking = {
        //     tutorName,
        //     subject,
        //     time: new Date(time)
        // }

        // let tutorBooking = {
        //     studentName,
        //     subject,
        //     time: new Date(time)
        // }

        tutor.bookings.push(tutorBooking)
        let savedBooking = await tutor.save()
        student.bookings.push(studentBooking)
        savedBooking = await student.save()

        res.json({
            message: "succesful saving of booking"
        })
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

exports.removeBooking = async (req, res) => {

    const { tutorName, bookingId } = req.params;

    try {
        let tutor = await Tutor.findOne({ name: tutorName });
        if (!tutor) return res.status(400).json({ error: 'no tutor found' })

        let booking = tutor.bookings.id(bookingId);
        if (!booking) return res.status(400).json({ error: `booking does not exist` })

        tutor.cancelledBookings.push(booking);
        booking.remove()

        try {
            let result = await tutor.save();
            res.send(`the following has been deleted: ${result}`);
        } catch (error) {
            res.send(`error of: ${error}`)
        }
    } catch (error) {
        res.status(400).json({ error: 'actual error' })
    }
    // TODO: make copy of booking in cancelled bookings of student and tutor
    let studentName = booking.studentName;
}


// TODO: MAKE SURE ITS REMOVING ALL SUBDOCS 
exports.removeAllBookings = async (req, res) => {
    let tutorName = req.params.tutorName;
    try {
        let tutor = await Tutor.findOne({ name: tutorName });
        if (!tutor) return res.status(400).json({ message: "no tutor found" })
        let bookings = tutor.bookings;
        // res.send(bookings)
        bookings.forEach(async (booking) => {
            tutor.bookings.id(booking._id).remove();
            let result = await tutor.save();
        })
        // let result = await tutor.save();
        res.status(400).json({ message: `successfully removed` })
    } catch (error) {
        res.send(`error of: ${error}`)
    }
}

