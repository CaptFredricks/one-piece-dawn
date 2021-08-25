import React, { Component } from 'react';

let form = null;
let chars = null;

class FormationForm extends Component {
	constructor(props) {
		super(props);
		
		form = props.form;
		chars = props.chars;
		
		this.state = {
			slot_1: form.slot_1,
			slot_2: form.slot_2,
			slot_3: form.slot_3,
			slot_4: form.slot_4,
			slot_5: form.slot_5
		}
	}
	
	submitData = (e) => {
		//e.preventDefault();
		
		fetch('/api/formation/save/', {
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
			<form className="formation-form" onSubmit={this.submitData}>
				<h1>Save Formation</h1>
				<label>Slot 1:
					<select name="slot_1" value={this.state.slot_1} onChange={
						e => this.setState({slot_1: parseInt(e.target.value, 10)})
					}>
						<option value="0">(none)</option>
						{chars.map(({ id, name }, idx) => {
							return <option key={idx} value={id}>{name}</option>
						})}
					</select>
				</label>
				<label>Slot 2:
					<select name="slot_2" value={this.state.slot_2} onChange={
						e => this.setState({slot_2: parseInt(e.target.value, 10)})
					}>
						<option value="0">(none)</option>
						{chars.map(({ id, name }, idx) => {
							return <option key={idx} value={id}>{name}</option>
						})}
					</select>
				</label>
				<label>Slot 3:
					<select name="slot_3" value={this.state.slot_3} onChange={
						e => this.setState({slot_3: parseInt(e.target.value, 10)})
					}>
						<option value="0">(none)</option>
						{chars.map(({ id, name }, idx) => {
							return <option key={idx} value={id}>{name}</option>
						})}
					</select>
				</label>
				<label>Slot 4:
					<select name="slot_4" value={this.state.slot_4} onChange={
						e => this.setState({slot_4: parseInt(e.target.value, 10)})
					}>
						<option value="0">(none)</option>
						{chars.map(({ id, name }, idx) => {
							return <option key={idx} value={id}>{name}</option>
						})}
					</select>
				</label>
				<label>Slot 5:
					<select name="slot_5" value={this.state.slot_5} onChange={
						e => this.setState({slot_5: parseInt(e.target.value, 10)})
					}>
						<option value="0">(none)</option>
						{chars.map(({ id, name }, idx) => {
							return <option key={idx} value={id}>{name}</option>
						})}
					</select>
				</label>
				<input type="submit" name="submit_form" />
			</form>
		);
	}
}

export default FormationForm;