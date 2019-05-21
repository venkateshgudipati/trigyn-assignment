const express = require('express');
const bodyParser = require('body-parser');

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');



// create express app
const app = express();
var cors = require('cors')


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors())

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

var router = express.Router();
// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log(req.url);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
require('./app/routes/user.route.js')(router);
require('./app/routes/report.route.js')(router);
require('./app/routes/expense.route.js')(router);
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// Require User routes


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
