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
			} else callback('unable to fetch weatch');
		}
	);
};

module.exports.getWeather = getWeather;
