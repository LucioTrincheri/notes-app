import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header";
//import "./App.css";
import TodoGroup from "./components/TodoGroup.js";

class App extends Component {
	state = {
		group: [
			{
				id: 1,
				title: "Grupo 1",
				todos: [
					{
						id: 3,
						title: "Grupo 1 - Todo 1",
						completed: false
					},
					{
						id: 4,
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
						id: 5,
						title: "Grupo 2 - Todo 1",
						completed: false
					},
					{
						id: 6,
						title: "Grupo 2 - Todo 2",
						completed: false
					}
				]
			}
		]
	};

	render() {
		return (
			<div className="App">
				<div className="container">
					{this.state.group.map(todoGroup => (
						<TodoGroup todoGroup={todoGroup} />
					))}
				</div>
			</div>
		);
	}
}

export default App;
