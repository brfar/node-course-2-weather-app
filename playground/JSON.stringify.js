const request = require('request');

var address = 'recife pe brazil'

request(
	{
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (error, response, body) => {
    console.log(JSON.stringify(response, undefined, 2));
  }
);

/** Analyzing the arguments in the callback function to request:
 *  body: this is part of HTTP, when you make a request to a website, the data 
 *  that comes back is the body of the request.
 *  response: this is where lives the statusCode. Bosy is also part of response fyi.
 *  that's why some ppl just use 'response.body'
 *  error: whenever statusCode != 200 'error' will throw.
 */

/**
 * This Google urls returns a giant fucking JSON file. If we don't use the JSON.stringy method
 * we wouldn't get the whole thing. Javascript clips some parts. This method takes 3 paramenters:
 * 1 - 'body': that would be the object we wanna stringify
 * 2 - 'undefined': replacer. it alters the behavior of the process. let's not mess with it.
 * 3 - '2': how many spaces you wanna use per indentation
 */