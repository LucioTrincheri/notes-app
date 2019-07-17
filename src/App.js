import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import "./App.css";
import TodoGroup from "./components/TodoGroup";
import AddTodoGroup from "./components/AddTodoGroup";
import About from "./components/pages/About";

class App extends Component {
	state = {
		group: [
			{
				id: 1,
				title: "Grupo 1",
				todos: [
					{
						id: 1,
						title: "Grupo 1 - Todo 1",
						completed: false
					},
					{
						id: 2,
						title: "Grupo 1 - Todo 2",
						completed: false
					}
				]
			},
			{
				id: 2,
				title: "Grupo 2",
				todos: [
					{
						id: 3,
						title: "Grupo 2 - Todo 1",
						completed: false
					},
					{
						id: 4,
						title: "Grupo 2 - Todo 2",
						completed: false
					}
				]
			}
		]
	};

	nextGroupID = 2;
	nextTodoID = 4;

	//Agregar nuevo grupo de notas
	addTodoGroup = title => {
		const newGroup = {
			id: this.nextGroupID++,
			title: title,
			todos: []
		};
		this.setState({
			group: [...this.state.group, newGroup]
		});
	};
	// Agregar nueva nota
	addTodo = (title, id) => {
		this.setState({
			group: this.state.group.map(todoGroup => {
				if (todoGroup.id === id) {
					const newTodo = {
						id: this.nextTodoID++,
						title: title,
						completed: false
					};
					todoGroup.todos = [...todoGroup.todos, newTodo];
				}
				return todoGroup;
			})
		});
	};

	render() {
		return (
			/*
			<div className="App">
				<div className="container">
					// TODO Agregar Header
					{this.state.group.map(todoGroup => (
						<TodoGroup addTodo={this.addTodo} todoGroup={todoGroup} />
					))}
					<AddTodoGroup />
				</div>
			</div>
			*/
			//! No funca y no tengo la mas remota idea de por que.
			<Router>
				<div className="App">
					<Header />
					<Route
						path="/"
						exact
						render={props => (
							<React.Fragment>
								{this.state.group.map(todoGroup => (
									<TodoGroup addTodo={this.addTodo} todoGroup={todoGroup} />
								))}
								<AddTodoGroup addTodoGroup={this.addTodoGroup} />
							</React.Fragment>
						)}
					/>
					<Route path="/about" component={About} />
				</div>
			</Router>
		);
	}
}

export default App;
