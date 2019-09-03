const router = require('express').Router();
// const jwt = require('jsonwebtoken');
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
		id: req.body.id,
		title: req.body.title,
		group: []
	});
	user.data.push(newGroup);
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// TODO Falta agregar envio de feedback sobre si se pudo guardar los datos
			res.status(200).send('Group created');
		}
	});
});

// Delete Group
router.post('/deleteGroup', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	for (var i = 0; i < user.data.length; i++) {
		if (user.data[i].id === req.body.id) {
			user.data.splice(i, 1);
			break;
		}
	}
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// TODO Falta el envio de informacion
			res.status(200).send('Group delete');
		}
	});
});

// Create Todo
router.post('/createTodo', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	// ? req.body.id -> id del todo
	const newTodo = new todo({
		id: req.body.id,
		title: req.body.title,
		completed: false
	});
	// ? req.body.groupId -> id del grupo del todo a agregar
	for (var i = 0, groupId = req.body.groupId; i < user.data.length; i++) {
		if (user.data[i].id == groupId) {
			user.data[i].todos.push(newTodo);
			break;
		}
	}
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// TODO Falta agregar envio de feedback sobre si se pudo guardar los datos
			res.status(200).send('Todo create');
		}
	});
});

// Delete Todo
router.post('/deleteTodo', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	// ? req.body.groupId -> id del grupo del todo a agregar
	// ? req.body.id -> id del todo
	for (var i = 0, groupId = req.body.groupId; i < user.data.length; i++) {
		if (user.data[i].id == groupId) {
			for (var j = 0, id = req.body.id; j < user.data[i].todos.length; j++) {
				if (user.data[i].todos[j].id == id) {
					user.data[i].todos.splice(j, 1);
					break;
				}
			}
			break;
		}
	}
	//user.data.id(req.body.groupId).todos.pull(req.body.id);
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// TODO Falta el envio de informacion
			res.status(200).send('Todo delete');
		}
	});
});

// Mark Todo as completed
router.post('/markCompleteTodo', verify, async (req, res) => {
	const user = await User.findById(req.user._id);
	// ? req.body.groupId -> id del grupo del todo a agregar
	// ? req.body.id -> id del todo
	for (var i = 0, groupId = req.body.groupId; i < user.data.length; i++) {
		if (user.data[i].id == groupId) {
			for (var j = 0, id = req.body.id; j < user.data[i].todos.length; j++) {
				if (user.data[i].todos[j].id == id) {
					user.data[i].todos[j].completed = !user.data[i].todos[j].completed;
					break;
				}
			}
			break;
		}
	}
	await user.save(function(err) {
		if (err) {
			res.status(400).send(err);
		} else {
			// TODO Falta el envio de informacion
			res.status(200).send('Todo mark complete');
		}
	});
});

module.exports = router;
