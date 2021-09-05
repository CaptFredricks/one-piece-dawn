import React from 'react';
import FetchFormation from '../../Fetch/FetchFormation';

const FormationPlayer = (props) => {
	// Fetch formation data
	const formation = FetchFormation();
	
	let content = <p>Formation not found!</p>;
	
	if(Object.keys(formation.data).length > 0) {
		let form = [formation.data.slot_1, formation.data.slot_2, formation.data.slot_3, formation.data.slot_4, formation.data.slot_5];
		let style = '';
		let x = 0;
		
		if(props.output !== null) {
			switch(props.output.type) {
				case 'atk':
					style = 'attacker';
					break;
				case 'def':
					style = 'defender';
					break;
				case 'heal':
					style = 'healer';
					break;
				default:
			}
		}
		
		form.forEach((fm, idx) => {
			props.form.some(ch => {
				if(ch.id === fm) {
					form[idx] = <li key={idx} className={props.hp && props.hp[x] === 0 ? 'dead' : (props.output && props.output.idx === x ? style : '')}>
									<div className="char">
										<img className="image" src={`/images/characters/${ch.name}.png`} alt={ch.name} />
										<span className="name-wrap">
											<span className="name">{ch.name}</span>
											<span className="hp" title={'HP: ' + (props.hp ? `${props.hp[x]}` : `${ch.hp}`)}>
												<div className="hp-bar" style={{width: (props.hp ? (props.hp[x] / ch.hp * 100) : 100) + '%'}}></div>
											</span>
										</span>
									</div>
								</li>;
					
					x++;
					return true;
				} else if(fm === 0) {
					form[idx] = <li key={idx} className="empty">
									<div className="char">
										<i>empty</i>
									</div>
								</li>;
					
					return true;
				}
				
				return false;
			});
		});
		
		content = <ul className="formation-player">
					{form.map(slot => { return slot; })}
				</ul>;
	}
	
	if(formation.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (content);
};

export default FormationPlayer;