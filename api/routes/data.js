const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { todoGroup, todo } = require('../models/Data');
const verify = require('./verify');

// Get the user data
router.get('/', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	res.status(200).send(user.data);
});

// Create Group
router.post('/createGroup', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	const newGroup = new todoGroup({
		title: req.body.title,
		group: []
	});
	user.data.push(newGroup);
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// ! Falta agregar envio de informacion
			res.status(200).send('Group create');
		}
	});
});

// Delete Group
router.post('/deleteGroup', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	user.data.pull(req.body.id);
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// ! Falta el envio de informacion
			res.status(200).send('Group delete');
		}
	});
});

// Create Todo
router.post('/createTodo', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	const newTodo = new todo({
		title: req.body.title,
		completed: false
	});
	user.data.id(req.body.id).todos.push(newTodo);
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// ! Falta el envio de informacion
			res.status(200).send('Todo create');
		}
	});
});

// Delete Todo
router.post('/deleteTodo', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	user.data.id(req.body.groupId).todos.pull(req.body.id);
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// ! Falta el envio de informacion
			res.status(200).send('Todo delete');
		}
	});
});

// Mark Todo as completed
router.post('/markCompleteTodo', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	user.data
		.id(req.body.groupId)
		.todos.id(req.body.id).completed = !user.data
		.id(req.body.groupId)
		.todos.id(req.body.id).completed;
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// ! Falta el envio de informacion
			res.status(200).send('Todo mark complete');
		}
	});
});

module.exports = router;
