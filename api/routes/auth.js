const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

// Register
router.post('/register', async (req, res) => {
	// Validation
	const { error } = registerValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	// Check if the user exists
	const emailExists = await User.findOne({ email: req.body.email });
	if (emailExists) {
		return res.status(400).send('User already registered with this email');
	}

	// Hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// Create new User
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});

	// Save user
	try {
		const savedUser = await user.save();
		res.status(200).send('User created successfully');
	} catch (err) {
		res.status(400).send(err);
	}
});

// Login
router.post('/login', async (req, res) => {
	// Validation
	const { error } = loginValidation({
		email: req.body.email,
		password: req.body.password
	});

	if (error) return res.status(400).send(error.details[0].message);

	// Check if the user exists
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Bad Request - Email doest exist');

	// Check if pass is correct
	const validPass = await bcrypt.compare(req.body.password, user.password);
	if (!validPass) return res.status(400).send('Email or password is invalid');

	// Create and assing a token
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

	// Ya no se ni que hacer help pls.
	//res.header('Authorization', token);
	res
		.status(200)
		.cookie('token', token, { maxAge: 8640000 })
		.send('Logged in');
});

module.exports = router;
