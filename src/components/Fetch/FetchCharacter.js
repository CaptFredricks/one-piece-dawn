import { useState, useEffect, useCallback, useRef } from 'react';

const FetchCharacter = (id) => {
	const hasFetched = useRef(false);
	const [character, setCharacter] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setCharacter({data: character.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/characters/${id}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();
			
			setCharacter({data: dataIn, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [character.data, id]);
	
	useEffect(() => {
		if(!hasFetched.current && id > 0) {
			fetchData();
			hasFetched.current = true;
		}
	}, [fetchData, id]);
	
	return character;
};

export default FetchCharacter;