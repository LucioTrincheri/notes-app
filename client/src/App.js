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
			fetch('/api/data', {
				method: 'GET'
			})
				.then(res => {
					console.log(res);
					this.setState({ group: res });
				})
				.catch(err => {
					console.error(err);
					alert('Error logging in please try again');
				});
		} else {
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

	delTodoGroup = id => {
		this.setState({
			group: this.state.group.filter(todoGroup => todoGroup.id !== id)
		});
	};

	render() {
		return (
			<Router>
				<div className='App'>
					<Header />
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
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</div>
			</Router>
		);
	}
}

export default App;
