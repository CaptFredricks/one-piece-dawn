import React from 'react';
import { Link } from 'react-router-dom';
import FetchCharacter from '../Fetch/FetchCharacter';
import FetchAbilities from '../Fetch/FetchAbilities';
import Belly from '../../assets/Belly.png';

const CharacterCard = ({ match, data }) => {
	// Fetch the character's id
	const id = match.params.id;
	
	// Fetch account data
	const account = data;
	
	// Fetch character data
	const character = FetchCharacter(id);
	
	// Fetch abilities data
	const abilities = FetchAbilities(id);
	
	let content = <p>No character data found!</p>;
	
	if(Object.keys(character.data).length > 0) {
		// Set whether the character is unlocked
		let unlocked = character.data._unlock < account.current_stage;
		
		content = <div className="content">
					<div className={`card ${character.data.rarity.toLowerCase()}`}>
						<h1 className="name">
							<span className={'unlock' + (unlocked ? ' is-unlocked' : '')} title={unlocked ? 'Character unlocked!' : 'Character unlocks after Stage ' + character.data._unlock}>{unlocked ? 'UNLOCKED' : 'LOCKED'}</span>
							{character.data.name}
							<span className="level" title="Current level">{character.data.level}</span>
						</h1>
						<dl className="stats">
							<dt title="Hitpoints">HP</dt>
							<dd>{character.data.hp}</dd>
							<dt title="Base damage">Dmg</dt>
							<dd>{character.data.dmg}</dd>
						</dl>
						<dl className="cost">
							<dt title="Purchase cost">Cost</dt>
							<dd>{character.data.cost > 0 ? <span><img src={Belly} title="Belly" alt="Belly" />{character.data.cost}</span> : 'Free'}</dd>
						</dl>
						{unlocked ? (character.data.cost > 0 ? (!character.data.is_purchased ? <Link to={`/characters/purchase/${id}/`} className="button">Purchase</Link> : null) : null) : null}
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