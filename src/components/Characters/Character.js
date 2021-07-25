import { Link } from 'react-router-dom';

const Character = (props) => {
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
		</tr>
	);
};

export default Character;