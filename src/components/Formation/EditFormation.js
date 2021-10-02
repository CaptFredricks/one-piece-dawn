import React from 'react';
import { Link } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import FetchFormation from '../Fetch/FetchFormation';
import FetchCharacters from '../Fetch/FetchCharacters';
import FormationForm from './FormationForm';

const EditFormation = ({ match }) => {
	// Fetch account data
	const account = FetchAccount();
	
	// Fetch formation data
	const formation = FetchFormation();
	
	// Fetch characters data
	const characters = FetchCharacters();
	
	let content = <p>No characters found!</p>;
	
	if(Object.keys(account.data).length > 0 && Object.keys(formation.data).length > 0 && characters.data.length > 0) {
		for(let i = characters.data.length - 1; i >= 0; i--) {
			// Exclude characters that are not yet owned
			if(!characters.data[i].is_owned) characters.data.splice(i, 1);
		}
		
		content = <div className="content">
					<FormationForm form={formation.data} chars={characters.data} />
				</div>;
	}
	
	if(account.isLoading || formation.isLoading || characters.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<main>
			<div className="breadcrumb">
				<Link to="/">Menu</Link> &rsaquo; <Link to="/formation/">Formation</Link> &rsaquo; Edit
			</div>
			{content}
		</main>
	);
}

export default EditFormation;