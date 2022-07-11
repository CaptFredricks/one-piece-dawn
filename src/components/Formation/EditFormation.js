import React from 'react';
import { Link } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import FormationForm from './FormationForm';

const EditFormation = (props) => {
	// Fetch account data
	const account = FetchAccount(props.token);
	
	// Fetch formation data
	const formation = props.form;
	
	// Fetch characters data
	const characters = props.chars.map(chars => ({...chars}));
	
	let content = <p>No characters found!</p>;
	
	if(Object.keys(account.data).length > 0 && Object.keys(formation).length > 0 && characters.length > 0) {
		for(let i = characters.length - 1; i >= 0; i--) {
			// Exclude characters that are not yet owned
			if(!characters[i].is_owned) characters.splice(i, 1);
		}
		
		content = <div className="content">
					<FormationForm id={account.data.id} form={formation} chars={characters} />
				</div>;
	}
	
	if(account.isLoading) {
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