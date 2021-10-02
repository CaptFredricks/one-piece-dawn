import { useState, useEffect, useCallback, useRef } from 'react';

const FetchFormationPlayer = () => {
	const has_fetched = useRef(false);
	const [formation, setFormation] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setFormation({data: formation.data, isLoading: true});
		
		try {
			const response = await fetch('/api/formation/player/');
			
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
					level: row.level,
					abilities: row.abilities
				};
			});
			
			setFormation({data: transformed_data, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [formation.data]);
	
	useEffect(() => {
		if(!has_fetched.current) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData]);
	
	return formation;
};

export default FetchFormationPlayer;