const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	id: String,
	title: String,
	completed: Boolean
});

const todoGroupSchema = new Schema({
	id: String,
	title: String,
	todos: [todoSchema]
});

module.exports.todoGroupSchema = todoGroupSchema;
module.exports.todoGroup = mongoose.model('todoGroup', todoGroupSchema);
module.exports.todo = mongoose.model('todo', todoSchema);
