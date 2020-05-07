const Student = require('../models/student');

exports.createStudent = (req, res) => {
    let student = new Student(req.body);
    student.save()
        .then(result => res.send(result))
        .catch(err => res.send(err));
}