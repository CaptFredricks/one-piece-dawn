import { useState, useEffect, useCallback, useRef } from 'react';

const FetchAbilities = (ch_id) => {
	const has_fetched = useRef(false);
	const [abilities, setAbilities] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setAbilities({data: abilities.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/abilities/${ch_id}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			const transformed_data = data_in.results.map(row => {
				return {
					id: row.id,
					name: row.name,
					ch: row.ch,
					_class: row._class,
					_value: row._value,
					cooldown: row.cooldown,
					lvl_unlock: row.level_unlock,
					description: row.description,
					is_passive: row.is_passive
				};
			});
			
			setAbilities({data: transformed_data, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [abilities.data, ch_id]);
	
	useEffect(() => {
		if(!has_fetched.current && ch_id > 0) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData, ch_id]);
	
	return abilities;
};

export default FetchAbilities;