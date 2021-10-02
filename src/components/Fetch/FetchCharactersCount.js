import { useState, useEffect, useCallback, useRef } from 'react';

const FetchCharactersCount = () => {
	const has_fetched = useRef(false);
	const [characters, setCharacters] = useState({ data: 0, isLoading: false });
	
	const fetchData = useCallback(async () => {
		setCharacters({ data: characters.data, isLoading: true });
		
		try {
			const response = await fetch('/api/characters/');
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			setCharacters({ data: data_in, isLoading: false });
		} catch(err) {
			console.log(err);
		}
	}, [characters.data]);
	
	useEffect(() => {
		if(!has_fetched.current) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData]);
	
	return characters;
};

export default FetchCharactersCount;