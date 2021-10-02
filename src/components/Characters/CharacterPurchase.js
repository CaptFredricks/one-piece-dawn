import { Link } from 'react-router-dom';
import FetchCharacter from '../Fetch/FetchCharacter';
import PurchaseForm from './PurchaseForm';

const CharacterPurchase = ({match, data}) => {
	// Fetch the character's id
	const id = match.params.id;
	
	const path = '/characters/';
	const account = data;
	
	// Fetch character data
	const character = FetchCharacter(id);
	
	let content = <p>No character data found!</p>;
	
	if(Object.keys(account).length > 0 && Object.keys(character.data).length > 0 && character.data.is_playable) {
		// Set whether the character is unlocked
		let unlocked = character.data.stage_unlock < account.current_stage;
		
		content = <div className="content">
					{unlocked ? (character.data.cost === 0 || character.data.is_owned ? <div>
							<p>You already own this character.</p>
							<Link to={`${path}card/${id}/`} className="button">Go Back</Link>
						</div> : <PurchaseForm account={account} character={character.data} />) : <div>
							<p>You haven't unlocked this character yet.</p>
							<Link to={`${path}card/${id}/`} className="button">Go Back</Link>
						</div>}
				</div>;
	}
	
	if(character.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<main>
			<div className="breadcrumb">
				<Link to="/">Menu</Link> &rsaquo; <Link to={path}>Characters</Link> &rsaquo; <Link to={`${path}card/${id}/`}>{character.data.name}</Link> &rsaquo; Purchase
			</div>
			{content}
		</main>
	);
}

export default CharacterPurchase;