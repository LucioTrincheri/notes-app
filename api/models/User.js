const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { todoGroupSchema } = require('./Data');

const userSchema = new Schema({
	name: String,
	email: String,
	password: String,
	data: [todoGroupSchema],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema);
