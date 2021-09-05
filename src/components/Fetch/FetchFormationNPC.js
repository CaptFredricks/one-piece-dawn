import { useState, useEffect, useCallback, useRef } from 'react';

const FetchFormationNPC = (stage) => {
	const hasFetched = useRef(false);
	const [formation, setFormation] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setFormation({data: formation.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/formation/npc-${stage}/`);
			
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
					level: row.level,
					type: row.type,
					abilities: row.abilities
				};
			});
			
			setFormation({data: transformed_data, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [formation.data, stage]);
	
	useEffect(() => {
		if(!hasFetched.current && stage > 0) {
			fetchData();
			hasFetched.current = true;
		}
	}, [fetchData, stage]);
	
	return formation;
};

export default FetchFormationNPC;