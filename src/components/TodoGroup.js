import React, { Component } from "react";
import PropTypes from "prop-types";
import Todo from "./Todo";
import css from "../styles/index.module.css";

class TodoGroup extends Component {
	render() {
		return (
			<div className={css.groupContainer}>
				<h1 className={css.groupTitle}>{this.props.todoGroup.title}</h1>
				{this.props.todoGroup.todos.map(todo => (
					<Todo todo={todo} />
				))}
			</div>
		);
	}
}

// PropTypes
TodoGroup.propTypes = {
	todoGroup: PropTypes.object.isRequired
};

export default TodoGroup;
