import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "../styles/index.module.css";

class AddTodo extends Component {
	state = {
		title: ""
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.addTodo(this.state.title, this.props.groupId);
		this.setState({ title: "" });
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		return (
			<form className={style.addTodo} onSubmit={this.onSubmit}>
				<input
					type='text'
					name='title'
					style={{ flex: "10", padding: "5px" }}
					placeholder='Add Note...'
					value={this.state.title}
					onChange={this.onChange}
				/>
				<input type='submit' value='Submit' className='btn' style={{ flex: "1" }} />
			</form>
		);
	}
}

// PropTypes

AddTodo.propTypes = {
	groupId: PropTypes.number.isRequired,
	addTodo: PropTypes.func.isRequired
};

export default AddTodo;
