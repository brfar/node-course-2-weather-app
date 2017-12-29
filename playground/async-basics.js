console.log('starting app'); // runs first

setTimeout(() => {
	console.log('inside the timeout'); // runs third
}, 0);

console.log('finishing up'); // runs second
