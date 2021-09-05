import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import FetchCharacters from '../Fetch/FetchCharacters';
import Character from './Character';
import CharacterCard from './CharacterCard';
import CharacterPurchase from './CharacterPurchase';
import './Characters.css';

const Characters = ({ match }) => {
	const path = '/characters/';
	
	// Fetch account data
	const account = FetchAccount();
	
	// Fetch characters data
	const characters = FetchCharacters();
	
	let content = <p>No characters found!</p>;
	
	if(Object.keys(account.data).length > 0 && Object.keys(characters.data).length > 0) {
		content = <div className="content">
					<h1>Characters</h1>
					<table className="characters">
						<thead>
							<tr>
								<th>Name</th>
								<th>HP</th>
								<th>Attack</th>
								<th>Defense</th>
								<th>Tier</th>
								<th>Level</th>
								<th>Type</th>
								<th>Unlocked?</th>
								<th>Purchased?</th>
							</tr>
						</thead>
						<tbody>
							{characters.data.map(ch => {
								return <Character key={ch.id} id={ch.id} name={ch.name} hp={ch.hp} attack={ch.attack} defense={ch.defense} tier={ch.tier} level={ch.level} type={ch.type} unlock={ch.unlock} stage={account.data.current_stage} cost={ch.cost} is_purchased={ch.is_purchased} />
							})}
						</tbody>
					</table>
				</div>;
	}
	
	if(account.isLoading || characters.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<div className="wrapper">
			<Switch>
				<Route exact={true} path={path}>
					<main>
						<div className="breadcrumb">
							<Link to="/">Menu</Link> &rsaquo; Characters
						</div>
						{content}
					</main>
				</Route>
				<Route path={`${path}card/:id`} render={(match) => <CharacterCard {...match} {...account} />} />
				<Route path={`${path}purchase/:id`} render={(match) => <CharacterPurchase {...match} {...account} />} />
			</Switch>
		</div>
	);
};

export default Characters;