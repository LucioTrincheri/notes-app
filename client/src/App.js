import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import nanoid from 'nanoid';
import Header from './components/layout/Header';
import './App.css';
import TodoGroup from './components/TodoGroup';
import AddTodoGroup from './components/AddTodoGroup';
import About from './components/pages/About';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

class App extends Component {
	state = {
		loggedIn: false,
		group: []
	};

	handleFetch = (route, req_method, req_body) => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');

		fetch(route, {
			headers: headers,
			method: req_method,
			body: JSON.stringify(req_body)
		})
			.then(res => {
				if (!res.status === 200) {
					// TODO Tratar la operacion fallida y los datos
					console.log('Error dentro de handleFetch');
					console.log(res);
				} else {
					console.log('handleFetch funciona correctamente');
				}
			})
			.catch(err => {
				console.log(err);
				console.error(err);
				alert('Server failed to process data');
			});
	};

	//Agregar nuevo grupo de notas
	addTodoGroup = title => {
		if (title === '') {
			return;
		}
		const newGroup = {
			id: nanoid(),
			title: title,
			todos: []
		};
		this.setState({
			group: [...this.state.group, newGroup]
		});
		this.handleFetch('/api/data/createGroup', 'POST', newGroup);
	};

	// Agregar nueva nota
	addTodo = (title, id) => {
		if (title === '') {
			return;
		}
		const newTodo = {
			id: nanoid(),
			title: title,
			completed: false
		};
		this.setState({
			group: this.state.group.map(todoGroup => {
				if (todoGroup.id === id) {
					todoGroup.todos = [...todoGroup.todos, newTodo];
				}
				return todoGroup;
			})
		});

		newTodo.groupId = id;
		this.handleFetch('/api/data/createTodo', 'POST', newTodo);
	};

	/**
	 * Borra el grupo de Todos.
	 * Filtra aquellos que posean la id del elemento a borrar.
	 *
	 * @param {string} id       Id del grupo a borrar.
	 */
	delTodoGroup = id => {
		this.setState({
			group: this.state.group.filter(todoGroup => todoGroup.id !== id)
		});
		this.handleFetch('/api/data/deleteGroup', 'POST', { id });
	};

	/**
	 * Borra el Todo.
	 * Itera por todos los grupos y filtra aquellos que
	 * posean la misma id que el elemento a borrar.
	 *
	 * @param {string} id       Id del elemento a borrar.
	 * @param {string} groupId  Id del grupo donde se encuentra ese elemento.
	 */
	delTodo = (id, groupId) => {
		this.setState({
			group: this.state.group.map(todoGroup => {
				if (todoGroup.id === groupId) {
					todoGroup.todos = todoGroup.todos.filter(todo => todo.id !== id);
				}
				return todoGroup;
			})
		});
		this.handleFetch('/api/data/deleteTodo', 'POST', { id, groupId });
	};

	// Change Todo status
	markComplete = (id, groupId) => {
		this.setState({
			group: this.state.group.map(todoGroup => {
				if (todoGroup.id === groupId) {
					todoGroup.todos = todoGroup.todos.map(todo => {
						if (todo.id === id) {
							todo.completed = !todo.completed;
						}
						return todo;
					});
				}
				return todoGroup;
			})
		});
		this.handleFetch('/api/data/markCompleteTodo', 'POST', { id, groupId });
	};

	fetchData = () => {
		fetch('/api/data', {
			method: 'GET'
		})
			.then(res => {
				if (!res.status === 200) {
					alert('Error fetching data, plese log in again');
				}
				return res.json();
			})
			.then(data => {
				console.log(data);
				this.setState({ group: data });
			})
			.catch(err => {
				console.log(err);
				console.error(err);
				alert('Server failed to process data');
			});
	};
	/**
	 * Cambia el estado de loggedIn.
	 */
	handleLogIn = () => {
		this.setState(prevState => ({
			...prevState,
			loggedIn: true
		}));
		this.fetchData();
	};

	render() {
		return (
			<Router>
				<div className='App'>
					<Header loggedIn={this.state.loggedIn} />
					<Route
						path='/'
						exact
						render={props => (
							<React.Fragment>
								{this.state.group.map(todoGroup => (
									<TodoGroup
										delTodoGroup={this.delTodoGroup}
										addTodo={this.addTodo}
										todoGroup={todoGroup}
										markComplete={this.markComplete}
										delTodo={this.delTodo}
									/>
								))}
								<AddTodoGroup addTodoGroup={this.addTodoGroup} />
							</React.Fragment>
						)}
					/>
					<Route path='/about' component={About} />
					<Route
						path='/login'
						render={props => <Login handleLogIn={this.handleLogIn} />}
					/>
					<Route path='/register' component={Register} />
				</div>
			</Router>
		);
	}
}

export default App;
