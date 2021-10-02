import React, { Component } from 'react';

class ResetPasswordForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			id: props.id ?? 0,
			current_pass: '',
			new_pass: '',
			confirm_pass: '',
			error: null
		}
	}
	
	submitData = (e) => {
		// Stop the form from submitting
		e.preventDefault();
		
		if(this.state.id !== 0) {
			if(this.state.current_pass !== '' && this.state.new_pass !== '' && this.state.confirm_pass !== '') {
				if(this.state.new_pass === this.state.confirm_pass) {
					fetch('/api/account/reset-pw/', {
						method: 'POST',
						body: JSON.stringify(this.state)
					}).then((response) => {
						return response.text();
					}).then((text) => {
						//console.log(text);
						
						if(text === 'current_pass_fail') {
							this.setState({ error: <p className="error">Current password is incorrect.</p> });
						} else {
							this.setState({ error: null });
							
							// Redirect to the account page
							window.location.href = '/account/';
							return false;
						}
					});
				} else {
					this.setState({ error: <p className="error">New and confirm passwords do not match.</p> });
				}
			} else {
				this.setState({ error: <p className="error">Please fill out all fields!</p> });
			}
		}
	}
	
	render() {
		return (
			<form className="account-form" onSubmit={this.submitData}>
				<h1>Reset Password</h1>
				<label>Current Password:
					<input type="password" value={this.state.current_pass} onChange={
						e => this.setState({ current_pass: e.target.value })
					} />
				</label>
				<label>New Password:
					<input value={this.state.new_pass} onChange={
						e => this.setState({ new_pass: e.target.value })
					} />
				</label>
				<label>Confirm New Password:
					<input value={this.state.confirm_pass} onChange={
						e => this.setState({ confirm_pass: e.target.value })
					} />
				</label>
				{this.state.error}
				<input type="submit" className="button" name="submit_form" value="Reset" />
			</form>
		);
	}
}

export default ResetPasswordForm;