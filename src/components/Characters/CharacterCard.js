import React from 'react';
import { Link } from 'react-router-dom';
import FetchCharacter from '../Fetch/FetchCharacter';
import FetchAbilities from '../Fetch/FetchAbilities';
import CharacterLevelUpForm from './CharacterLevelUpForm';
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
		const data = character.data;
		const tier = [];
		const unlocked = data.stage_unlock < account.current_stage;
		const is_owned = data.is_owned;
		
		// Tier 1: 5
		// Tier 2: 10
		// Tier 3: 20
		// Tier 4: 40
		// Tier 5: 80
		const max_lvl = 5 * Math.pow(2, (data.tier - 1));
		const current_lvl = data.level ?? 1;
		
		const calcStat = (lvl, tier, val) => {
			return Math.round(Math.pow(lvl, 2) / 5 * (tier / 5) + val);
		}
		
		const calcCost = (lvl, val) => {
			return Math.pow(lvl, 2) + val;
		}
		
		let hp = calcStat(current_lvl, data.tier, data.hp);
		let attack = calcStat(current_lvl, data.tier, data.attack);
		let defense = calcStat(current_lvl, data.tier, data.defense);
		let cost = calcCost(current_lvl, 10);
		
		for(let i = 1; i <= data.tier; i++) {
			tier[i] = <i key={i} className="fas fa-star"></i>;
		}
		
		content = <div className="content">
					<div className="card">
						<div className="left-panel">
							<div className="top">
								<div className="level-wrap">
									<i className="far fa-circle"></i>
									<span className="level" title="Current level">{current_lvl}</span>
								</div>
								<span className={'unlock' + (unlocked ? ' is-unlocked' : '')} title={unlocked ? 'Character unlocked!' : 'Character unlocks after Stage ' + data.stage_unlock}><i className={unlocked ? 'fas fa-unlock' : 'fas fa-lock'}></i></span>
							</div>
							{unlocked && (data.cost === 0 || (data.cost > 0 && is_owned)) && (account.medallions > 0 && account.belly > cost) ? (current_lvl < max_lvl ? <CharacterLevelUpForm acct_id={account.id} ch_id={data.id} cost={cost} /> : <p>Max level reached!</p>) : null}
							<ul className="stats">
								<li><strong title="Hitpoints">HP</strong> <span>{hp}</span></li>
								<li><strong title="Base attack">ATK</strong> <span>{attack}</span></li>
								<li><strong title="Base defense">DEF</strong> <span>{defense}</span></li>
								<li><strong title="Purchase cost">COST</strong> <span>{data.cost > 0 ? <span><img src={Belly} title="Belly" alt="Belly" />{data.cost}</span> : 'Free'}</span></li>
								<li>{unlocked && data.cost > 0 && !is_owned ? <Link to={`/characters/purchase/${id}/`} className="button">Purchase</Link> : null}</li>
							</ul>
							<h2>Abilities</h2>
							{abilities.isLoading ? <p>Loading...</p> : (abilities.data.length > 0 ? <ul className="abilities">
								{abilities.data.map(ab => {
									let cd = ab.is_passive ? 'Passive' : 'CD: ' + ab.cooldown + ' ' +
										(ab.cooldown === 1 ? 'turn' : 'turns');
									
									return <li key={ab.id} className={current_lvl < ab.lvl_unlock ? 'locked' : ''} title={`${ab.name}${current_lvl < ab.lvl_unlock ? ' \u2014 LOCKED' : ''}
  ${ab._class.replace('_', '/').toUpperCase()}: ${ab._value < 1 ? ab._value * 100 + '%' : ab._value} \u2022 ${cd}
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