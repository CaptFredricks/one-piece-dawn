import React, { Component } from 'react';

class CharacterLevelUp extends Component {
	constructor(props) {
		super(props);
		
		this.cost = props.cost;
		
		this.state = {
			acct_id: props.acct_id,
			id: props.ch_id,
			cost: this.cost
		}
	}
	
	submitData = (e) => {
		//e.preventDefault();
		
		fetch('/api/characters/levelup/', {
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
			<form className="level-up-form" onSubmit={this.submitData}>
				<input type="submit" className="button" name="submit_form" value="Level Up" title={`Cost: 1 Medallion + ${this.cost} Belly`} />
			</form>
		);
	}
}

export default CharacterLevelUp;