// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;
const server = app.listen(port, listenning);
function listenning() {
	console.log(`Server running on http://localhost: ${port}`);
}

/**
 * Get endpoint for returning all data
 */
app.get('/all', sendData);
function sendData(req, res) {
	res.send(projectData);
}

/**
 * Post endpoint for posting data to server
 */
app.post('/addWeather', addWeather);
function addWeather(req, res) {
	projectData = {
		temperature: req.body.temperature,
		date: req.body.date,
		feeling: req.body.feeling,
	};
	console.log(req.body);
}
