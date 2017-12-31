/* request take some JSON data, convert it to some JS object
so we can acess the JSON propreties in our code. Request make HTTP requests*/
const request = require('request');
/* request take 2 arguments: an options object and a callback function */

/* 'request' does not support promises. this is why we're wrapping the whole thing inside a promise! */
const geocodeAddress = address => {
	return new Promise((resolve, reject) => {
		encodedAddress = encodeURIComponent(address);
		request(
			{
				url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
				json: true // this tells that the data coming back is gonna be a JSON, so it's gonna convert it to an object
			},
			(error, response, body) => {
				if (error) {
					reject('unable to connect to google servers');
				} else if (body.status === 'ZERO_RESULTS') {
					reject('unable to find address');
				} else if (body.status === 'OK') {
					resolve({
						address: body.results[0].formatted_address,
						latitude: body.results[0].geometry.location.lat,
						longitude: body.results[0].geometry.location.lng
					});
				}
			}
		);
	});
};

geocodeAddress('19146').then(
	location => {
		console.log(JSON.stringify(location, undefined, 2));
	},
	errorMessage => {
		console.log(errorMessage);
	}
);
