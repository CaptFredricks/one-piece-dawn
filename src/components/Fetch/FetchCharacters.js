import { useState, useEffect, useCallback, useRef } from 'react';

const FetchCharacters = () => {
	const hasFetched = useRef(false);
	const [characters, setCharacters] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setCharacters({data: characters.data, isLoading: true});
		
		try {
			const response = await fetch('/api/characters/');
			
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
					rarity: row.rarity,
					description: row.description
				};
			});
			
			setCharacters({data: transformedData, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [characters.data]);
	
	useEffect(() => {
		if(!hasFetched.current) {
			fetchData();
			hasFetched.current = true;
		}
	}, [fetchData]);
	
	return characters;
};

export default FetchCharacters;