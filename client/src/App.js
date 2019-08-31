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
	/*
	componentDidMount() {
		if (this.state.loggedIn) {
			const head = new Headers();
			fetch('/api/data', {
				method: 'GET',
				headers: head
			})
				.then(res => {
					res.json();
					console.log(res);
					this.setState({ group: res });
				})
				.catch(err => {
					console.error(err);
					alert('Error fetching data, plese log in again');
				});
		}
	}*/

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

		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');

		fetch('/api/data/createGroup', {
			headers: headers,
			method: 'POST',
			body: JSON.stringify(newGroup)
		})
			.then(res => {
				if (!res.status === 200) {
					// TODO borrar el grupoTodo creado ya que no se guardo
					// TODO en la base de datos
					console.log('Error al crear el grupoTodo');
					console.log(res);
				} else {
					console.log('Grupo creado correctamente');
				}
			})
			.catch(err => {
				console.log(err);
				console.error(err);
				alert('Server failed to process data');
			});
	};

	// Agregar nueva nota
	addTodo = (title, id) => {
		if (title === '') {
			return;
		}
		this.setState({
			group: this.state.group.map(todoGroup => {
				if (todoGroup.id === id) {
					const newTodo = {
						id: nanoid(),
						title: title,
						completed: false
					};
					todoGroup.todos = [...todoGroup.todos, newTodo];
				}
				return todoGroup;
			})
		});
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
	};

	/**
	 * Cambia el estado de loggedIn.
	 */
	handleLogIn = () => {
		this.setState(prevState => ({
			...prevState,
			loggedIn: true
		}));

		fetch('/api/data', {
			method: 'GET'
		})
			.then(res => {
				if (!res.status == 200) {
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
