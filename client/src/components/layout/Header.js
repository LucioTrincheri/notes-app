import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Header extends Component {
	renderLinks = text => {
		switch (text) {
			case 'Home':
				return (
					<Link style={linkStyle} to='/'>
						Home
					</Link>
				);
				break;
			case 'About':
				return (
					<Link style={linkStyle} to='/about'>
						About
					</Link>
				);
				break;
			case 'Login':
				if (!this.props.loggedIn) {
					return (
						<Link style={linkStyle} to='/login'>
							Login
						</Link>
					);
				}
				break;
			case 'Register':
				if (!this.props.loggedIn) {
					return (
						<Link style={linkStyle} to='/register'>
							Register
						</Link>
					);
				}
				break;

			case 'Logout':
				return 'Hola';
				break;
			default:
				return 'Default';
				break;
		}
	};
	render() {
		return (
			<header style={headerStyle}>
				<h1>TodoList</h1>
				{this.renderLinks('Home')} | {this.renderLinks('About')} |{' '}
				{this.renderLinks('Login')} | {this.renderLinks('Register')} |{' '}
				{this.renderLinks('Logout')}
			</header>
		);
	}
}

/*  // ? Codigo anterior del render
				<Link style={linkStyle} to='/'>
					Home
				</Link>{' '}
				|{' '}
				<Link style={linkStyle} to='/about'>
					About
				</Link>{' '}
				|{' '}
				<Link style={linkStyle} to='/login'>
					Login
				</Link>{' '}
				|{' '}
				<Link style={linkStyle} to='/register'>
					Register
				</Link>
*/
const headerStyle = {
	background: '#333',
	color: '#fff',
	textAlign: 'center',
	padding: '10px'
};

const linkStyle = {
	color: '#fff',
	textDecoration: 'none'
};

Header.propTypes = {
	loggedIn: PropTypes.bool.isRequired
};

export default Header;
