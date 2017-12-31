const yargs = require('yargs');
const axios = require('axios'); // 'request' alternative that supports promises

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

/* v replace blank spaces for '%20' */
const encondedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encondedAddress}`;

axios
	.get(geocodeUrl) //.get returns a promise. that's why we can call .then
	.then(response => {
		if (response.data.status === 'ZERO_RESULTS') {
			throw new Error('unable to find that address');
			// the rest of the code won't run. it'll go straight to .catch!
		}
		const lat = response.data.results[0].geometry.location.lat;
		const lng = response.data.results[0].geometry.location.lng;
		const weatherUrl = `https://api.darksky.net/forecast/0654fe6bd3e639be04eb8006a5bf1218/${lat},${lng}`;
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherUrl);
	})
	.then(response => {
		const temperature = response.data.currently.temperature;
		const apparentTemperature = response.data.currently.apparentTemperature;
		console.log(`it's currently ${temperature}. it feels like ${apparentTemperature}`);
	})
	.catch(e => {
		if (e.code === 'ENOTFOUND')
			//ENOTFOUND comes from the Google API
			console.log('unable to connect to api servers');
		else console.log(e.message);
	});
