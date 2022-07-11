import React, { Component } from 'react';

class RedeemForm extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			id: props.id,
			code: '',
			result: null
		};
	}
	
	submitData = (e) => {
		e.preventDefault();
		
		fetch('/api/account/redeem/', {
			method: 'POST',
			body: JSON.stringify(this.state)
		}).then((response) => {
			return response.text();
		}).then((response_text) => {
			let text = JSON.parse(response_text);
			
			this.setState({ result: null });
			
			if(text.error != null)
				this.setState({ result: <p className="result error">{text.error}</p> });
			
			if(text.success != null)
				this.setState({ result: <p className="result success">{text.success}</p> });
		});
	}
	
	render() {
		return (
			<form className="redeem-form" onSubmit={this.submitData}>
				<h1>Redeem Code</h1>
				<input value={this.state.code} onChange={
					e => this.setState({ code: e.target.value })
				} />
				{this.state.result}
				<input type="submit" className="button" name="submit_form" value="Redeem" />
			</form>
		);
	}
}

export default RedeemForm;