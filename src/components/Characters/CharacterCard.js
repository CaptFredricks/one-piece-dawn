import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ match }) => {
	const [chData, setChData] = useState([]);
	const [abData, setAbData] = useState([]);
	const [chIsLoading, setChIsLoading] = useState(false);
	const [abIsLoading, setAbIsLoading] = useState(false);
	const [chError, setChError] = useState(null);
	const [abError, setAbChError] = useState(null);
	
	const chPath = '/characters/';
	const abPath = '/abilities/';
	const id = match.params.propsId;
	
	/* Fetch character data */
	
	const fetchCharData = useCallback(async () => {
		setChIsLoading(true);
		setChError(null);
		
		try {
			const response = await fetch(`/api${chPath}${id}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();
			
			setChData(dataIn);
		} catch(error) {
			setChError(error.message);
		}
		setChIsLoading(false);
	}, []);
	
	/* Fetch abilities data */
	
	const fetchAbilData = useCallback(async () => {
		setAbIsLoading(true);
		setAbChError(null);
		
		try {
			const response = await fetch(`/api${abPath}${id}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();
			
			const transformedData = dataIn.results.map(row => {
				return {
					id: row.id,
					ch: row.ch,
					name: row.name,
					attack: row.attack,
					defense: row.defense,
					heal: row.heal,
					description: row.description,
				};
			});
			setAbData(transformedData);
		} catch(error) {
			setAbChError(error.message);
		}
		setAbIsLoading(false);
	}, []);
	
	useEffect(() => {
		fetchCharData();
		fetchAbilData();
	}, [fetchCharData, fetchAbilData]);
	
	let content = <p>No character data found!</p>;
	
	if(Object.keys(chData).length > 0) {
		content = <div className="content">
					<div className={`card ${chData.rarity.toLowerCase()}`}>
						<h1 className="name">
							{chData.name}
							<span className="level" title="Level">{chData.level}</span>
						</h1>
						<dl className="stats">
							<dt>HP</dt>
							<dd>{chData.hp}</dd>
							<dt>Dmg</dt>
							<dd>{chData.dmg}</dd>
						</dl>
						<h2>Description</h2>
						<p>{chData.description}</p>
						<h2>Abilities</h2>
						{abIsLoading ? <p>Loading...</p> : (abData.length > 0 ? <ul className="abilities">
							{abData.map(ab => {
								return <li key={ab.id} title={`${ab.name}
	Attack: ${ab.attack} • Defense: ${ab.defense} • Heal: ${ab.heal}

	${ab.description}`}>{ab.name}</li>
							})}
						</ul> : <p>This character has no abilities.</p>)}
					</div>
				</div>;
	}
	
	if(chError) {
		content = <p>{chError}</p>;
	}
	
	if(chIsLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<main>
			<div className="breadcrumb">
				<Link to="/">Menu</Link> &rsaquo; <Link to={chPath}>Characters</Link> &rsaquo; {chData.name}
			</div>
			{content}
		</main>
	);
}

export default CharacterCard;