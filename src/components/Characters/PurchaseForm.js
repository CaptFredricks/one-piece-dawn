import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Belly from '../../assets/Belly.png';

class PurchaseForm extends Component {
	constructor(props) {
		super(props);
		
		this.account = props.account;
		this.character = props.character;
		
		this.state = {
			acct_id: this.account.id,
			id: this.character.id,
			cost: this.character.cost
		}
	}
	
	submitData = (e) => {
		e.preventDefault();
		
		fetch('/api/characters/purchase/', {
			method: 'POST',
			body: JSON.stringify(this.state)
		}).then((response) => {
			return response.text();
		}).then((text) => {
			console.log(text);
			
			window.location.href = '/characters/card/' + this.state.id + '/';
			return false;
		});
	}
	
	render() {
		return (
			<form className="purchase-form" onSubmit={this.submitData}>
				<h1>Purchase Character</h1>
				<h2>{this.character.name}</h2>
				<dl className="details">
					<dt>Cost</dt>
					<dd><img src={Belly} title="Belly" alt="Belly" />{this.character.cost}</dd>
					<dt>You Have</dt>
					<dd><img src={Belly} title="Belly" alt="Belly" />{this.account.belly}</dd>
				</dl>
				{this.account.belly >= this.character.cost ? <input type="submit" className="button" name="submit_form" value="Purchase" /> : <div>
						<p>You don't have enough Belly to purchase {this.character.name}.</p>
						<Link to={`/characters/card/${this.character.id}/`} className="button">Go Back</Link>
					</div>}
			</form>
		);
	}
}

export default PurchaseForm;