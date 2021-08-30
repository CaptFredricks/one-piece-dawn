import React, { Component } from 'react';

class StageAdvanceForm extends Component {
	constructor(props) {
		super(props);
		
		this.data = props.data;
		
		this.state = {
			belly: this.data.belly_reward,
			medallions: this.data.lvl_point_reward
		}
	}
	
	submitData = (e) => {
		//e.preventDefault();
		
		fetch('/api/story/advance/', {
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
			<form className="stage-form" onSubmit={this.submitData}>
				<input type="submit" className="button" name="submit_form" value="Advance to Next Stage!" />
			</form>
		);
	}
}

export default StageAdvanceForm;