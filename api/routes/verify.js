const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	function clearTokenAndNext() {
		res
			.clearCookie('token')
			.status(401)
			.send('User not logged in');
		next();
	}
	const { token } = req.cookies;
	//console.log(token);
	if (!token) return clearTokenAndNext();

	try {
		const verUser = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verUser;
	} catch (error) {
		res.status(401).send('Invalid Token');
	}
	next();
};
