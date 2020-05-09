const Student = require('../models/student');

exports.createStudent = async (req, res) => {
    let student = new Student(req.body);
    try {
        let savedStudent = await student.save();
        res.send(savedStudent)
    } catch (error) {
        res.send(error)
    }
}