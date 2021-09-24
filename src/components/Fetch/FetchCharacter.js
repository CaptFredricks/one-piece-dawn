import { useState, useEffect, useCallback, useRef } from 'react';

const FetchCharacter = (id) => {
	const has_fetched = useRef(false);
	const [character, setCharacter] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setCharacter({data: character.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/characters/${id}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			setCharacter({data: data_in, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [character.data, id]);
	
	useEffect(() => {
		if(!has_fetched.current && id > 0) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData, id]);
	
	return character;
};

export default FetchCharacter;