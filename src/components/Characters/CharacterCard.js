import React from 'react';
import { Link } from 'react-router-dom';
import FetchCharacter from '../Fetch/FetchCharacter';
import FetchAbilities from '../Fetch/FetchAbilities';
import CharacterLevelUpForm from './CharacterLevelUpForm';
import Belly from '../../assets/Belly.png';
import '../../assets/font-awesome.min.css';
import '../../assets/font-awesome-rules.min.css';

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
		const data = character.data;
		const tier = [];
		const unlocked = data._unlock < account.current_stage;
		
		// Tier 1: 4
		// Tier 2: 9
		// Tier 3: 16
		// Tier 4: 25
		// Tier 5: 36
		const max_lvl = Math.pow((data.tier + 1), 2);
		
		const calcStat = (lvl, tier, val) => {
			return Math.round(Math.pow(lvl, 2) / 5 * (tier / 5) + val);
		}
		
		const calcCost = (lvl, val) => {
			return Math.pow(lvl, 2) + val;
		}
		
		let hp = calcStat(data.level, data.tier, data.hp);
		let attack = calcStat(data.level, data.tier, data.attack);
		let defense = calcStat(data.level, data.tier, data.defense);
		let cost = calcCost(data.level, 10);
		
		for(let i = 1; i <= data.tier; i++) {
			tier[i] = <i key={i} className="fas fa-star"></i>;
		}
		
		content = <div className="content">
					<div className="card">
						<div className="left-panel">
							<div className="top">
								<div className="level-wrap">
									<svg>
										<g>
											<path d="M25 0 L25 0 32 20 50 20 36 32 42 50 25 38 8 50 14 32 0 20 18 20 25 0" stroke="#000" strokeWidth="2" />
											<circle cx="25" cy="28" r="15" stroke="#000" strokeWidth="2" />
										</g>
									</svg>
									<span className="level" title="Current level">{data.level}</span>
								</div>
								<span className={'unlock' + (unlocked ? ' is-unlocked' : '')} title={unlocked ? 'Character unlocked!' : 'Character unlocks after Stage ' + data._unlock}><i className={unlocked ? 'fas fa-unlock' : 'fas fa-lock'}></i></span>
							</div>
							{unlocked && (data.cost === 0 || (data.cost > 0 && data.is_purchased)) && (account.medallions > 0 && account.belly > cost) ? (data.level < max_lvl ? <CharacterLevelUpForm ch_id={data.id} cost={cost} /> : <p>Max level reached!</p>) : null}
							<ul className="stats">
								<li><strong title="Hitpoints">HP</strong> <span>{hp}</span></li>
								<li><strong title="Base attack">ATK</strong> <span>{attack}</span></li>
								<li><strong title="Base defense">DEF</strong> <span>{defense}</span></li>
								<li><strong title="Purchase cost">COST</strong> <span>{data.cost > 0 ? <span><img src={Belly} title="Belly" alt="Belly" />{data.cost}</span> : 'Free'}</span></li>
								<li>{unlocked && data.cost > 0 && !data.is_purchased ? <Link to={`/characters/purchase/${id}/`} className="button">Purchase</Link> : null}</li>
							</ul>
							<h2>Abilities</h2>
							{abilities.isLoading ? <p>Loading...</p> : (abilities.data.length > 0 ? <ul className="abilities">
								{abilities.data.map(ab => {
									return <li key={ab.id} className={data.level < ab.lvl_unlock ? 'locked' : ''} title={`${ab.name}${data.level < ab.lvl_unlock ? ' \u2014 LOCKED' : ''}
  Attack: ${ab.attack} • Defense: ${ab.defense} • Heal: ${ab.heal}
  Unlocks at: Lv${ab.lvl_unlock}

${ab.description}`}>{ab.name}</li>
							})}
							</ul> : <p>This character has no abilities.</p>)}
						</div>
						<div className="center-panel">
							<img className="image" src={`/images/characters/${data.name}.png`} title={data.name} alt={data.name} />
							<h1 className="name-wrap">
								<span className="name">{data.name}</span>
								<span className="tier-wrap">
									<span className="tier" title={`Tier ${data.tier}`}>{tier}</span>
								</span>
							</h1>
							<p className="description">{data.description}</p>
						</div>
						<div className="right-panel">
						</div>
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