const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://testUser:testPass123@ds115094.mlab.com:15094/tutoring_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err))

// * Middleware
app.use(morgan('dev'));
app.use(express.json()); //Used to parse JSON bodies
app.use(cookieParser());
app.use(cors());

// * Routes
const tutorRoutes = require('./routes/tutor');
const studentRoutes = require('./routes/student');
const bookingRoutes = require('./routes/booking');

// * Routes Middleware
app.use('/api', tutorRoutes);
app.use('/api', studentRoutes);
app.use('/api', bookingRoutes);

app.get('/', (req, res) => {
    res.send('Home');
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log('started listening'));