import React from 'react';
import { Link, Route } from 'react-router-dom';
import FetchCharacters from '../Fetch/FetchCharacters';
import Character from './Character';
import CharacterCard from './CharacterCard';
import './Characters.css';

const Characters = ({ match }) => {
	const path = '/characters/';
	
	// Fetch characters data
	const characters = FetchCharacters();
	
	let content = <p>No characters found!</p>;
	
	if(Object.keys(characters.data).length > 0) {
		content = <div className="content">
					<h1>Characters</h1>
					<table className="characters">
						<thead>
							<tr>
								<th>Name</th>
								<th>HP</th>
								<th>Dmg</th>
								<th>Level</th>
								<th>Type</th>
								<th>Rarity</th>
							</tr>
						</thead>
						<tbody>
							{characters.data.map(ch => {
								return <Character key={ch.id} id={ch.id} name={ch.name} hp={ch.hp} dmg={ch.dmg} level={ch.level} type={ch.type} rarity={ch.rarity} />
							})}
						</tbody>
					</table>
				</div>;
	}
	
	if(characters.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<div className="wrapper">
			<Route exact={true} path={path}>
				<main>
					<div className="breadcrumb">
						<Link to="/">Menu</Link> &rsaquo; Characters
					</div>
					{content}
				</main>
			</Route>
			<Route path={`${path}card/:propsId`} component={CharacterCard} />
		</div>
	);
};

export default Characters;