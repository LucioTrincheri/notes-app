const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
	title: String,
	completed: Boolean
});

const todoGroupSchema = new Schema({
	title: String,
	todos: [todoSchema]
});

module.exports.todoGroupSchema = todoGroupSchema;
module.exports.todoGroup = mongoose.model('todoGroup', todoGroupSchema);
module.exports.todo = mongoose.model('todo', todoSchema);
