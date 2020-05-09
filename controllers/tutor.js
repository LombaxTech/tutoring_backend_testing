const Tutor = require('../models/tutor');

exports.createTutor = async (req, res) => {
    let tutor = new Tutor(req.body);
    try {
        const savedUser = await tutor.save();
        res.send(savedUser);
    } catch (error) {
        res.send(error)
    }
}

exports.getTutors = async (req, res) => {
    try {
        let tutors = await Tutor.find();
        if (!tutors) return res.status(400).json({ error: `no tutors found` });

        tutors = tutors.map(tutor => ({
            name: tutor.name,
            _id: tutor._id
        }))

        res.send(tutors);

    } catch (error) {
        return res.status(400).json({ error: `error of: ${error}` });
    }

}