const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h').argv;

const encondedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encondedAddress}`;

axios
	.get(geocodeUrl)
	.then((response) => {
		if (response.data.status === 'ZERO_RESULTS') {
			throw new Error('unable to find that address :(');
		}
		const lat = response.data.results[0].geometry.location.lat;
		const lng = response.data.results[0].geometry.location.lng;
		const weatherUrl = `https://api.darksky.net/forecast/0654fe6bd3e639be04eb8006a5bf1218/${lat},${lng}`;
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherUrl);
	})
	.then((response) => {
		const temperature = response.data.currently.temperature;
		const apparentTemperature = response.data.currently.apparentTemperature;
		console.log(`it's currently ${temperature}. it feels like ${apparentTemperature}`);
	})
	.catch((e) => {
		if (e.code === 'ENOTFOUND') {
			console.log('unable to connect to api servers');
		} else {
			console.log(e.message);
		}
	});

