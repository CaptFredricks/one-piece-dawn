import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Logout extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			session: ''
		}
	}
	
	logout = (e) => {
		const { cookies } = this.props;
		
		fetch('/api/account/logout/', {
			method: 'POST',
			body: JSON.stringify(this.state)
		}).then((response) => {
			return response.text();
		}).then((text) => {
			console.log('Logged out.');
			
			// Delete the cookie
			cookies.remove('session', { path: '/' });
			
			window.location.href = '/';
			return false;
		});
	}
	
	render() {
		return (
			<button className="button" onClick={this.logout}>Log Out</button>
		);
	}
}

export default withCookies(Logout);