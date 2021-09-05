import { Link } from 'react-router-dom';

const Character = (props) => {
	const tier = [];
	const unlocked = props.unlock < props.stage;
	
	const calcStat = (lvl, tier, val) => {
		return Math.round(Math.pow(lvl, 2) / 5 * (tier / 5) + val);
	}
	
	let hp = calcStat(props.level, props.tier, props.hp);
	let attack = calcStat(props.level, props.tier, props.attack);
	let defense = calcStat(props.level, props.tier, props.defense);
	
	for(let i = 1; i <= props.tier; i++) {
		tier[i] = <i key={i} className="fas fa-star"></i>;
	}
	
	return (
		<tr className="character">
			<td className="col-name">
				<img src={`/images/characters/${props.name}.png`} title={props.name} alt={props.name} />
				<Link to={`/characters/card/${props.id}/`} title={props.name}>{props.name}</Link>
			</td>
			<td className="col-hp">
				<span title={`Base: ${props.hp}
Bonus: ${hp - props.hp}`}>{hp}</span>
			</td>
			<td className="col-attack">
				<span title={`Base: ${props.attack}
Bonus: ${attack - props.attack}`}>{attack}</span>
			</td>
			<td className="col-defense">
				<span title={`Base: ${props.defense}
Bonus: ${defense - props.defense}`}>{defense}</span>
			</td>
			<td className="col-tier">{tier}</td>
			<td className="col-level">{props.level}</td>
			<td className="col-type">{props.type}</td>
			<td className="col-unlocked"><span style={{cursor: 'help'}} title={unlocked ? '' : 'Unlocks after Stage ' + props.unlock}>{unlocked ? 'Yes' : 'No'}</span></td>
			<td className="col-is-purchased"><span style={{cursor: 'help'}} title={props.cost > 0 ? (props.is_purchased ? '' : 'Purchase for ' + props.cost + ' Belly') : 'Free'}>{props.cost > 0 ? (props.is_purchased ? 'Yes' : 'No') : '\u2014'}</span></td>
		</tr>
	);
};

export default Character;