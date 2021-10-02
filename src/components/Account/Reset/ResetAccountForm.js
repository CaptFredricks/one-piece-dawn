import React, { Component } from 'react';

class ResetPasswordForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			id: props.id ?? 0
		}
	}
	
	submitData = (e) => {
		// Stop the form from submitting
		e.preventDefault();
		
		if(this.state.id !== 0) {
			fetch('/api/account/reset-acct/', {
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
	}
	
	cancel = () => {
		// Redirect to the account page
		window.location.href = '/account/';
		return false;
	}
	
	render() {
		return (
			<form className="account-form" onSubmit={this.submitData}>
				<h1>Reset Account</h1>
				<p>Are you really sure you want to reset your account? You will lose all story progress and every character you own will be deleted from your account.</p>
				<p>You should only do this if you want to start the game over from the beginning.</p>
				<p>Be very careful, as this action cannot be undone.</p>
				<input type="submit" className="button" name="submit_form" value="Reset" />
				<button className="button" onClick={this.cancel}>Cancel</button>
			</form>
		);
	}
}

export default ResetPasswordForm;