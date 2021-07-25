import React, { useState, useEffect, useCallback } from 'react';
import { Link, Route } from 'react-router-dom';
import Character from './Character';
import CharacterCard from './CharacterCard';
import './Characters.css';

const Characters = ({ match }) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const path = '/characters/';
	
	const fetchData = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const response = await fetch(`/api${path}`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();

			const transformedData = dataIn.results.map(row => {
				return {
					id: row.id,
					name: row.name,
					hp: row.hp,
					dmg: row.dmg,
					level: row.level,
					type: row.type,
					rarity: row.rarity
				};
			});
			setData(transformedData);
		} catch(error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);
	
	useEffect(() => {
		fetchData();
	}, [fetchData]);
	
	let content = <p>No characters found!</p>;
	
	if(data.length > 0) {
		content = <div className="content">
					<h1>Characters</h1>
					<table className="characters">
						<thead>
							<tr>
								<th>Name</th>
								<th>HP</th>
								<th>Dmg</th>
								<th>Level</th>
								<th>Type</th>
								<th>Rarity</th>
							</tr>
						</thead>
						<tbody>
							{data.map(ch => {
								return <Character key={ch.id} id={ch.id} name={ch.name} hp={ch.hp} dmg={ch.dmg} level={ch.level} type={ch.type} rarity={ch.rarity} />
							})}
						</tbody>
					</table>
				</div>;
	}
	
	if(error) {
		content = <p>{error}</p>;
	}
	
	if(isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<div className="wrapper">
			<Route exact={true} path={path}>
				<main>
					<div className="breadcrumb">
						<Link to="/">Menu</Link> &rsaquo; Characters
					</div>
					{content}
				</main>
			</Route>
			<Route path={`${path}card/:propsId`} component={CharacterCard} />
		</div>
	);
};

export default Characters;