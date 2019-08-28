const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	const token = req.header('auth-token');
	if (!token) return res.status(401).send('User not logged in');

	try {
		const verUser = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verUser;
	} catch (error) {
		res.status(401).send('Invalid Token');
	}
	next();
};
