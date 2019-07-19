import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "../styles/index.module.css";

export class Todo extends Component {
	render() {
		const { id, title, completed } = this.props.todo;
		return (
			<div className={style.todoContainer}>
				<p>
					<input
						type='checkbox'
						className={style.completeBtn}
						checked={completed}
						onChange={this.props.markComplete.bind(this, id, this.props.groupId)}
					/>{" "}
					<label className={style.completeLabel}>{title}</label>
					<button className={style.delBtnStyle} onClick={this.props.delTodo.bind(this, id, this.props.groupId)}>
						Delete
					</button>
				</p>
			</div>
		);
	}
}

// PropTypes
Todo.propTypes = {
	todo: PropTypes.object.isRequired,
	delTodo: PropTypes.func.isRequired,
	groupId: PropTypes.number.isRequired,
	markComplete: PropTypes.func.isRequired
};

export default Todo;
