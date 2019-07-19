import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "../styles/index.module.css";

export class AddTodoGroup extends Component {
	state = {
		title: ""
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.addTodoGroup(this.state.title);
		this.setState({ title: "" });
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });
	render() {
		return (
			<form className={style.addTodoGroup} onSubmit={this.onSubmit}>
				<input
					type='text'
					name='title'
					style={{ flex: "10", padding: "5px" }}
					placeholder='Add Group...'
					value={this.state.title}
					onChange={this.onChange}
				/>
				<input type='submit' value='Submit' className='btn' style={{ flex: "1" }} />
			</form>
		);
	}
}

AddTodoGroup.propTypes = {
	addTodoGroup: PropTypes.func.isRequired
};

export default AddTodoGroup;
