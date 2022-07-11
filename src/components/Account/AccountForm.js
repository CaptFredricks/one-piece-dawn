import React, { Component } from 'react';

class AccountForm extends Component {
	constructor(props) {
		super(props);
		
		this.data = props.data;
		
		this.state = {
			id: this.data.id,
			username: this.data.username ?? '',
			email: this.data.email ?? ''
		}
	}
	
	submitData = (e) => {
		e.preventDefault();
		
		fetch('/api/account/save/', {
			method: 'POST',
			body: JSON.stringify(this.state)
		}).then((response) => {
			return response.text();
		}).then((text) => {
			//console.log(text);
			
			// Redirect to the account page
			window.location.href = '/account/';
			return false;
		});
	}
	
	render() {
		return (
			<form className="account-form" onSubmit={this.submitData}>
				<h1>Save Account</h1>
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
				<input type="submit" className="button" name="submit_form" value="Save" />
			</form>
		);
	}
}

export default AccountForm;