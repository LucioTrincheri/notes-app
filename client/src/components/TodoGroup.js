import React, { Component } from "react";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import css from "../styles/index.module.css";

class TodoGroup extends Component {
	submit = () => {
		confirmAlert({
			title: "Confirm to delete",
			message: "Are you sure to do this.",
			buttons: [
				{
					label: "Yes",
					onClick: () => this.props.delTodoGroup(this.props.todoGroup.id)
				},
				{
					label: "No"
				}
			]
		});
	};

	render() {
		return (
			<div className={css.groupContainer}>
				<p className={css.container}>
					<h1 className={css.groupTitle}>{this.props.todoGroup.title}</h1>
					<button className={css.delBtnStyle} onClick={this.submit}>
						Delete group
					</button>
				</p>
				<AddTodo groupId={this.props.todoGroup.id} addTodo={this.props.addTodo} />
				{this.props.todoGroup.todos.map(todo => (
					<Todo todo={todo} delTodo={this.props.delTodo} groupId={this.props.todoGroup.id} markComplete={this.props.markComplete} />
				))}
			</div>
		);
	}
}

// PropTypes
TodoGroup.propTypes = {
	todoGroup: PropTypes.object.isRequired,
	addTodo: PropTypes.func.isRequired,
	delTodoGroup: PropTypes.func.isRequired,
	markComplete: PropTypes.func.isRequired,
	delTodo: PropTypes.func.isRequired
};

export default TodoGroup;
