import React from 'react';
import { Link, Route } from 'react-router-dom';
import FetchFormation from '../Fetch/FetchFormation';
import FetchCharactersFormation from '../Fetch/FetchCharactersFormation';
import EditFormation from './EditFormation';
import './Formation.css';

const Formation = (props) => {
	const path = '/formation/';
	
	// Fetch formation data
	const formation = FetchFormation(props.token);
	
	// Fetch characters data
	const characters = FetchCharactersFormation();
	
	let content = <p>No formations found!</p>;
	
	if(Object.keys(formation.data).length > 0 && characters.data.length > 0) {
		const form = [formation.data.slot_1, formation.data.slot_2, formation.data.slot_3, formation.data.slot_4, formation.data.slot_5];
		
		form.forEach((fm, idx) => {
			characters.data.some(ch => {
				if(ch.id === fm) {
					form[idx] = <li key={idx}>
									<img className="image" src={`/images/characters/${ch.name}.png`} title={ch.name} alt={ch.name} />
									<span className="name">{ch.name}</span>
									<span className="icons-wrap">
										<i className="fas fa-star tier" title="Tier">
											<span>{ch.tier}</span>
										</i>
										<i className="fas fa-circle level" title="Level">
											<span>{ch.level}</span>
										</i>
									</span>
								</li>;
					return true;
				} else if(fm === 0) {
					form[idx] = <li key={idx}>
									<i className="empty">empty</i>
								</li>;
					return true;
				} else {
					return false;
				}
			});
		});
		
		content = <div className="content">
					<div className="formation">
						<h1>Your Formation</h1>
						<ul>
							{form.map(slot => { return slot; })}
						</ul>
					</div>
				</div>;
	}
	
	if(formation.isLoading || characters.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<div className="wrapper">
			<Route exact={true} path={path}>
				<main>
					<div className="breadcrumb">
						<Link to="/">Menu</Link> &rsaquo; Formation
					</div>
					{content}
					<Link to={`${path}edit/`} className="button">Edit Formation</Link>
				</main>
			</Route>
			<Route path={`${path}edit/`}>
				<EditFormation token={props.token} form={formation.data} chars={characters.data} />
			</Route>
		</div>
	);
};

export default Formation;