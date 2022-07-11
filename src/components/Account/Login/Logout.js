import React, { Component } from 'react';

class Logout extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			session: ''
		}
	}
	
	logout = (e) => {
		fetch('/api/account/logout/', {
			method: 'POST',
			body: JSON.stringify(this.state)
		}).then((response) => {
			return response.text();
		}).then((text) => {
			localStorage.clear();
			console.log('Logged out.');
			
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

export default Logout;