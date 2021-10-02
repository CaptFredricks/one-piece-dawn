import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class RegisterForm extends Component {
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	
	constructor(props) {
		super(props);
		
		this.state = {
			username: '',
			email: '',
			password: '',
			error: null,
			session: ''
		}
	}
	
	submitData = (e) => {
		const { cookies } = this.props;
		
		//e.preventDefault();
		
		if(this.state.username !== '' && this.state.email !== '' && this.state.password !== '') {
			let expires = new Date();
			
			// Set the cookie to expire in 2 weeks
			expires.setDate(expires.getDate() + 14);
			
			fetch('/api/account/register/', {
				method: 'POST',
				body: JSON.stringify(this.state)
			}).then((response) => {
				return response.text();
			}).then((text) => {
				console.log('Account created.');
				
				let data = text.split(' ');
				this.setState({ error: null, session: data[1] });
				
				// Create a cookie with the session value
				cookies.set('session', this.state.session, {
					path: '/',
					expires: expires,
					secure: !!data[0]
				});
				
				console.log(cookies.get('session'));
			});
		} else {
			e.preventDefault();
			
			this.setState({ error: <p className="error">Please fill out all fields!</p> });
		}
	}
	
	render() {
		return (
			<form className="register-form" onSubmit={this.submitData}>
				<h1>Register Account</h1>
				<label>Username:
					<input value={this.state.username} onChange={
						e => this.setState({ username: e.target.value })
					} />
				</label>
				<label>Email:
					<input type="email" value={this.state.email} onChange={
						e => this.setState({ email: e.target.value })
					} />
				</label>
				<label>Password:
					<input value={this.state.password} onChange={
						e => this.setState({ password: e.target.value })
					} />
				</label>
				{this.state.error}
				<input type="submit" className="button" name="submit_form" value="Register" />
			</form>
		);
	}
}

export default withCookies(RegisterForm);