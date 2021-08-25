import { useState, useEffect, useCallback, useRef } from 'react';

const FetchAbilities = (ch_id) => {
	const hasFetched = useRef(false);
	const [abilities, setAbilities] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setAbilities({data: abilities.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/abilities/${ch_id}/`);
			
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
					lvl_unlock: row.lvl_unlock,
					description: row.description,
				};
			});
			
			setAbilities({data: transformedData, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [abilities.data, ch_id]);
	
	useEffect(() => {
		if(!hasFetched.current && ch_id > 0) {
			fetchData();
			hasFetched.current = true;
		}
	}, [fetchData, ch_id]);
	
	return abilities;
};

export default FetchAbilities;