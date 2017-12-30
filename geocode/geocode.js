const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  
	request(
		{
			url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
			json: true // this tells that the data coming back is gonna be a JSON, so it's gonna convert it to an object
		},
		(error, response, body) => {
			if (error) {
				callback('unable to connect to google servers.');
			} else if (body.status === 'ZERO_RESULTS') {
				// 'ZERO_RESULTS vem no api do google quando o user digita um zip code inválido!
				callback('unable to find that address.');
			} else if (body.status === 'OK') {
				callback(undefined, {
					address: body.results[0].formatted_address,
					latitude: body.results[0].geometry.location.lat,
					longitude: body.results[0].geometry.location.lng
				});
			}
		}
	);
};

module.exports.geocodeAddress = geocodeAddress;
