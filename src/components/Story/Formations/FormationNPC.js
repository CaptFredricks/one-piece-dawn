import React from 'react';
import FetchFormationStage from '../../Fetch/FetchFormationStage';

const FormationNPC = (props) => {
	// Fetch formation data
	const formation = FetchFormationStage(props.stage);
	
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
				} else {
					return false;
				}
			});
		});
		
		content = <ul className="formation-npc">
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

export default FormationNPC;