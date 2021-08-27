import React, { Component } from 'react';

class StageRestartForm extends Component {
	render() {
		return (
			<form className="stage-form">
				<input type="submit" className="button" name="submit_form" value="NPC won. Restart?" />
			</form>
		);
	}
}

export default StageRestartForm;