import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			redirect: false
		};
		//this.handleLogIn = this.props.handleLogIn.bind(this);
	}

	handleInputChange = event => {
		const { value, name } = event.target;
		this.setState({
			[name]: value
		});
	};

	onSubmit = event => {
		event.preventDefault();
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		headers.append('Accept', 'application/json');
		fetch('/api/user/login', {
			headers: headers,
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state)
		}).then(res => {
			if (res.status === 200) {
				console.log(res);
				this.props.handleLogIn();
				this.setState({ email: '', password: '', redirect: true });
			} else {
				// TODO "Datos erroneos, intente nuevamente"
				console.log('Failure when auth');
			}
		});
	};

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to='/' />;
		}
	};

	render() {
		return (
			<div>
				{this.renderRedirect()}
				<form onSubmit={this.onSubmit}>
					<h1>Login Below!</h1>
					<input
						type='email'
						name='email'
						placeholder='Enter email'
						value={this.state.email}
						onChange={this.handleInputChange}
						required
					/>
					<input
						type='password'
						name='password'
						placeholder='Enter password'
						value={this.state.password}
						onChange={this.handleInputChange}
						required
					/>
					<input type='submit' value='Submit' />
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	handleLogIn: PropTypes.func.isRequired
};

export default Login;
