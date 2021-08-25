import React, { Component } from 'react';

let data = null;

class AccountForm extends Component {
	constructor(props) {
		super(props);
		
		data = props.data;
		
		this.state = {
			username: data.username,
			email: data.email
		}
	}
	
	submitData = (e) => {
		//e.preventDefault();
		
		fetch('/api/account/save/', {
			method: 'POST',
			body: JSON.stringify(this.state)
		}).then((response) => {
			return response.text();
		}).then((text) => {
			console.log(text);
		});
	}
	
	render() {
		return (
			<form className="account-form" onSubmit={this.submitData}>
				<h1>Save Account</h1>
				<label>Username:
					<input name="username" value={this.state.username} onChange={
						e => this.setState({ username: e.target.value })
					} />
				</label>
				<label>Email:
					<input type="email" value={this.state.email} onChange={
						e => this.setState({ email: e.target.value })
					} />
				</label>
				<input type="submit" className="button" name="submit_form" />
			</form>
		);
	}
}

export default AccountForm;