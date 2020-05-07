const Tutor = require('../models/tutor');

exports.createTutor = (req, res) => {
    let tutor = new Tutor(req.body);
    tutor.save()
        .then(result => res.send(result))
        .catch(err => res.send(err));
}