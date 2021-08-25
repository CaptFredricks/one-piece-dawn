import React from 'react';
import FetchFormation from '../../Fetch/FetchFormation';

const FormationPlayer = (props) => {
	// Fetch formation data
	const formation = FetchFormation();
	
	let content = <p>Formation not found!</p>;
	
	if(Object.keys(formation.data).length > 0) {
		let form = [formation.data.slot_1, formation.data.slot_2, formation.data.slot_3, formation.data.slot_4, formation.data.slot_5];
		
		form.forEach((fm, idx) => {
			props.data.some(ch => {
				if(ch.id === fm) {
					form[idx] = ch.name;
					return true;
				} else if(fm === 0) {
					form[idx] = <i>empty</i>;
					return true;
				}
				
				return false;
			});
		});
	
		content = <ul className="formation-player">
					{form.map((slot, idx) => {
						return <li key={idx}>{slot}</li>
					})}
				</ul>;
	}
	
	if(formation.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (content);
};

export default FormationPlayer;