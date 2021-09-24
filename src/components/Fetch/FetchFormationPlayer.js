import { useState, useEffect, useCallback, useRef } from 'react';

const FetchFormationPlayer = () => {
	const hasFetched = useRef(false);
	const [formation, setFormation] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setFormation({data: formation.data, isLoading: true});
		
		try {
			const response = await fetch('/api/formation/player/');
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();
			
			const transformedData = dataIn.results.map(row => {
				return {
					id: row.id,
					name: row.name,
					hp: row.hp,
					attack: row.attack,
					defense: row.defense,
					tier: row.tier,
					level: row.level,
					_class: row._class,
					abilities: row.abilities
				};
			});
			
			setFormation({data: transformedData, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [formation.data]);
	
	useEffect(() => {
		if(!hasFetched.current) {
			fetchData();
			hasFetched.current = true;
		}
	}, [fetchData]);
	
	return formation;
};

export default FetchFormationPlayer;