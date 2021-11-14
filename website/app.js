/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=ee0ba533f5fba550b7eb09e4f5ff0936';
const units = '&units=metric';

const generateButton = document.getElementById('generate');

generateButton.addEventListener('click', generateWeather);

function generateWeather() {
	const d = new Date();
	const date = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
	const zip = document.getElementById('zip').value;
	const feelings = document.getElementById('feelings').value;

	getWeatherFromApi(baseUrl, zip, apiKey, units)
		.then(function (data) {
			console.log('Data recieved from API');
			console.log(data);
			const newData = {
				date: date,
				temperature: data.main.temp,
				feelings: feelings,
			};

			postData('/addWeather', newData);
			return newData;
		})
		.then(function (data) {
			console.log('Data recieved from local server');
			console.log(data);
			updateUI(data);
		});
}

// Get request to the local server
const getData = async (url = '') => {
	try {
		const data = await fetch(url);
		return data;
	} catch (error) {
		console.log('error', error);
	}
};

// API call to get the weather data of specified country zip
const getWeatherFromApi = async (baseURL, country, key, units = '') => {
	const res = await fetch(baseURL + country + key + units);
	try {
		const data = await res.json();
		return data;
	} catch (error) {
		console.log('error', error);
	}
};

// Post request to the local server
const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	try {
		const data = await response.json();
		console.log(`Server Response - ${data.response}`);
		return data;
	} catch (error) {
		console.log('error', error);
	}
};

// Update UI
function updateUI(data) {
	const dateDiv = document.getElementById('date');
	const tempDiv = document.getElementById('temp');
	const contentDiv = document.getElementById('content');
	const entryDiv = document.getElementById('entryHolder');

	entryDiv.style.display = 'none';
	dateDiv.innerHTML = `Date - ${data.date}`;
	tempDiv.innerHTML = `Temperature - ${data.temperature}\u00B0`;
	contentDiv.innerHTML = `Feeling - ${data.feelings}`;
	entryDiv.style.display = 'block';
}
