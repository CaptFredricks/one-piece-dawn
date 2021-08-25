import React from 'react';
import { Link } from 'react-router-dom';
import FetchCharacter from '../Fetch/FetchCharacter';
import FetchAbilities from '../Fetch/FetchAbilities';

const CharacterCard = ({ match }) => {
	const id = match.params.propsId;
	
	// Fetch character data
	const character = FetchCharacter(id);
	
	// Fetch abilities data
	const abilities = FetchAbilities(id);
	
	let content = <p>No character data found!</p>;
	
	if(Object.keys(character.data).length > 0 && Object.keys(abilities.data).length > 0) {
		content = <div className="content">
					<div className={`card ${character.data.rarity.toLowerCase()}`}>
						<h1 className="name">
							{character.data.name}
							<span className="level" title="Level">{character.data.level}</span>
						</h1>
						<dl className="stats">
							<dt>HP</dt>
							<dd>{character.data.hp}</dd>
							<dt>Dmg</dt>
							<dd>{character.data.dmg}</dd>
						</dl>
						<h2>Description</h2>
						<p>{character.data.description}</p>
						<h2>Abilities</h2>
						{abilities.isLoading ? <p>Loading...</p> : (abilities.data.length > 0 ? <ul className="abilities">
							{abilities.data.map(ab => {
								return <li key={ab.id} title={`${ab.name}
  Attack: ${ab.attack} • Defense: ${ab.defense} • Heal: ${ab.heal}
  Unlocks at: Lv${ab.lvl_unlock}

${ab.description}`}>{ab.name}</li>
							})}
						</ul> : <p>This character has no abilities.</p>)}
					</div>
				</div>;
	}
	
	if(character.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<main>
			<div className="breadcrumb">
				<Link to="/">Menu</Link> &rsaquo; <Link to="/characters/">Characters</Link> &rsaquo; {character.data.name}
			</div>
			{content}
		</main>
	);
}

export default CharacterCard;