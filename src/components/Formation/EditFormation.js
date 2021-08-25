import React from 'react';
import { Link } from 'react-router-dom';
import FetchFormation from '../Fetch/FetchFormation';
import FetchCharacters from '../Fetch/FetchCharacters';
import FormationForm from './FormationForm';

const EditFormation = ({ match }) => {
	// Fetch formation data
	const formation = FetchFormation();
	
	// Fetch characters data
	const characters = FetchCharacters();
	
	let content = <p>No characters found!</p>;
	
	if(Object.keys(formation.data).length > 0 && Object.keys(characters.data).length > 0) {
		content = <div className="content">
					<FormationForm form={formation.data} chars={characters.data} />
				</div>;
	}
	
	if(formation.isLoading || characters.isLoading) {
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
};

export default EditFormation;