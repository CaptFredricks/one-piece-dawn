import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class LoginForm extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			username: '',
			password: '',
			error: null,
			session: ''
		}
	}
	
	submitData = (e) => {
		const { cookies } = this.props;
		
		e.preventDefault();
		
		if(this.state.username !== '' && this.state.password !== '') {
			let expires = new Date();
			
			// Set the cookie to expire in 2 weeks
			expires.setDate(expires.getDate() + 14);
			
			fetch('/api/account/login/', {
				method: 'POST',
				body: JSON.stringify(this.state)
			}).then((response) => {
				return response.text();
			}).then((text) => {
				console.log('Logged in.');
				
				let data = text.split(' ');
				this.setState({ error: null, session: data[1] });
				
				// Create a cookie with the session value
				cookies.set('session', this.state.session, {
					path: '/',
					expires: expires,
					secure: !!data[0]
				});
			});
		} else {
			e.preventDefault();
			
			this.setState({ error: <p className="error">Please fill out all fields!</p> });
		}
	}
	
	render() {
		return (
			<form className="login-form" onSubmit={this.submitData}>
				<h1>Account Login</h1>
				<label>Username:
					<input value={this.state.username} onChange={
						e => this.setState({ username: e.target.value })
					} />
				</label>
				<label>Password:
					<input value={this.state.password} onChange={
						e => this.setState({ password: e.target.value })
					} />
				</label>
				{this.state.error}
				<input type="submit" className="button" name="submit_form" value="Log In" />
			</form>
		);
	}
}

export default withCookies(LoginForm);