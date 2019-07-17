import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "../styles/index.module.css";

export class Todo extends Component {
	getStyle = () => {
		return {
			background: "#f4f4f4",
			borderBottom: "1px #ccc dotted",
			textDecoration: this.props.todo.completed ? "line-through" : "none"
		};
	};

	render() {
		const { id, title, completed } = this.props.todo;
		return (
			<div className={style.todoContainer}>
				<p>
					<input
						type="checkbox"
						// TODO onChange={this.props.markComplete.bind(this, id)}
					/>{" "}
					{title}
					<button
						className={style.delBtnStyle}
						// TODO onClick={this.props.delTodo.bind(this, id)}
					>
						Delete
					</button>
				</p>
			</div>
		);
	}
}

// PropTypes
Todo.propTypes = {
	todo: PropTypes.object.isRequired
};

export default Todo;
