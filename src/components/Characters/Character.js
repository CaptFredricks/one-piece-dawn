import { Link } from 'react-router-dom';

const Character = (props) => {
	let unlocked = props.unlock < props.stage;
	
	return (
		<tr className={`character ${props.rarity.toLowerCase()}`}>
			<td>
				<Link to={`/characters/card/${props.id}/`}>{props.name}</Link>
			</td>
			<td>{props.hp}</td>
			<td>{props.dmg}</td>
			<td>{props.level}</td>
			<td>{props.type}</td>
			<td>{props.rarity}</td>
			<td><span style={{cursor: 'help'}} title={unlocked ? '' : 'Unlocks after Stage ' + props.unlock}>{unlocked ? 'Yes' : 'No'}</span></td>
			<td><span style={{cursor: 'help'}} title={props.cost > 0 ? (props.is_purchased ? '' : 'Purchase for ' + props.cost + ' Belly') : 'Free'}>{props.cost > 0 ? (props.is_purchased ? 'Yes' : 'No') : '\u2014'}</span></td>
		</tr>
	);
};

export default Character;