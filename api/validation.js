const Joi = require('@hapi/joi');

// Register Validation
const registerValidation = data => {
	const schema = {
		name: Joi.string()
			.min(4)
			.max(20)
			.required(),
		email: Joi.string()
			.max(50)
			.required()
			.email(),
		password: Joi.string()
			.min(6)
			.max(512)
			.required()
	};
	return Joi.validate(data, schema);
};

// Login Validation
const loginValidation = data => {
	const schema = {
		email: Joi.string()
			.max(50)
			.required()
			.email(),
		password: Joi.string()
			.min(6)
			.max(512)
			.required()
	};
	return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
