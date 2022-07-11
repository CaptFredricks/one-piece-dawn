import { useState, useEffect, useCallback, useRef } from 'react';

const FetchCharacters = (start, per_page, update) => {
	const has_fetched = useRef(false);
	const [characters, setCharacters] = useState({ data: [], isLoading: false });
	
	const fetchData = useCallback(async () => {
		setCharacters({ data: characters.data, isLoading: true });
		
		try {
			const response = await fetch(`/api/characters/${start}-${per_page}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			const transformed_data = data_in.results.map(row => {
				return {
					id: row.id,
					name: row.name,
					hp: row.hp,
					attack: row.attack,
					defense: row.defense,
					tier: row.tier,
					_class: row._class,
					unlock: row.stage_unlock,
					cost: row.cost,
					description: row.description,
					level: row.level,
					is_owned: row.is_owned
				};
			});
			
			setCharacters({ data: transformed_data, isLoading: false });
		} catch(err) {
			console.log(err.message);
		}
	}, [characters.data, start, per_page]);
	
	useEffect(() => {
		if(update) {
			has_fetched.current = false;
		}
		
		if(!has_fetched.current) {
			fetchData();
			has_fetched.current = true;
		}
	}, [update, fetchData]);
	
	return characters;
};

export default FetchCharacters;