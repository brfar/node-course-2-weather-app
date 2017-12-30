const request = require('request');

const getWeather = (lat, lng, callback) => {
	request(
		{
			url: `https://api.darksky.net/forecast/0654fe6bd3e639be04eb8006a5bf1218/${lat},${lng}`,
			json: true
		},
		(error, response, body) => {
			if (!error && response.statusCode === 200) {
				callback(undefined, {
					temperature: body.currently.temperature,
					apparentTemperature: body.currently.apparentTemperature
				});
				/* undefined is used on the first argument above because this is where the error message
				would be located. since there ain't no error, it's undefined. */
			} else callback('unable to fetch weatch'); // this is the first and only argument; the error message!
		}
	);
};

module.exports.getWeather = getWeather;
