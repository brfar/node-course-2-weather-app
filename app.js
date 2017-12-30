const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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
// '.argv' takes all the configuration. runs thru our arguments and stores the result in the argv varible

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
	if (errorMessage) console.log(errorMessage);
	else {
		console.log(results.address);
		weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
				errorMessage ? console.log(errorMessage) : console.log(`it's currently ${weatherResults.temperature}. it feels like ${weatherResults.apparentTemperature}.`);
			}
		);
	}	
});
