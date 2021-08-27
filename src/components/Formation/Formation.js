import React from 'react';
import { Link, Route } from 'react-router-dom';
import FetchFormation from '../Fetch/FetchFormation';
import FetchCharacters from '../Fetch/FetchCharacters';
import EditFormation from './EditFormation';
import './Formation.css';

const Formation = ({ match }) => {
	const path = '/formation/';
	
	// Fetch formation data
	const formation = FetchFormation();
	
	// Fetch characters data
	const characters = FetchCharacters();
	
	let content = <p>No formations found!</p>;
	
	if(Object.keys(formation.data).length > 0 && characters.data.length > 0) {
		const form = [formation.data.slot_1, formation.data.slot_2, formation.data.slot_3, formation.data.slot_4, formation.data.slot_5];
		
		form.forEach((fm, idx) => {
			characters.data.some(ch => {
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
		
		content = <div className="content">
					<div className="formation">
						<h1>Your Formation</h1>
						<ul>
							{form.map((slot, idx) => {
								return <li key={idx}>{slot}</li>
							})}
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
			<Route path={`${path}edit/`} component={EditFormation} />
		</div>
	);
};

export default Formation;