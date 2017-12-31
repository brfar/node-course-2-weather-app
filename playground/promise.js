/* The 'somePromise' variable is equal to the return result from the constructor function for Promises.
'new' creates a new instance of a promise, then we're gonna provide the thing we wanna create a new 
instance of: 'Promise'. This Promise function takes one argument, which is gonna be a function, inside 
this function is gonna be all the asynchronous stuff you wanna do.

The callback function takes two arguments: 'resolve' and 'reject' and this is how we're gonna manage the 
state of our Promise; when you make a promise, you're basically saying "hey ima go try and fetch that 
website data for you". This could go well, in this case you would 'resolve' the promise, setting its 
state to 'fulfilled'. When a promise is fulfilled, its done the thing you expected it to do. 
Now when you call 'reject' you're saying 'yo, we tried to get shit done but just could not' so the promise
has been considered rejected 

You can only pass ONE argument to both resolve and reject which means if you wanna provide multiple pieces
of information, it'd be better to resolve/reject an object that you set multiple properties on. */
const somePromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		// resolve('hey. it works');
		reject('unable to fulfill promise');
	}, 2500);
});

/* We need to call the .then method when a promise is resolved (and .catch when it's rejected) 
.then lets us provide callback functions for both success and error cases. This is one of the
areas that callbacks differ from promises; in a callback, we have one function that fires no
matter what, and the arguments let us know whether or not things went well. In promises, we're
gonna have 2 functions and that is gonna be what determines whether or not things went as planned. */
somePromise.then(
	message => {
		console.log('sucess', message);
	},
	errorMessage => {
		console.log('error: ', errorMessage);
	}
);

///////////////////////////////////////////

const asynAdd = (a, b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			(typeof a === 'number' && typeof b === 'number')
				? resolve(a + b)
				: reject('arguments must be numbers');
		}, 1500);
	});
};

asynAdd(5, 7)
	.then(res => {
		console.log('result: ', res);
		return asynAdd(res, 33);
	})
	.then(res => {
		console.log('should be 45: ', res);
	})
	.catch(errorMessage => {
		console.log(errorMessage);
	});
