const getUser = (id, callback) => {
	const user = {
		id,
		name: 'vikram',
	};
	callback(user);
};

getUser(31, (userObj) => {
	console.log(userObj);
});
