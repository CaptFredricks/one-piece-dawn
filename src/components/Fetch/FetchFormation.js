import { useState, useEffect, useCallback, useRef } from 'react';

const FetchFormation = () => {
	const has_fetched = useRef(false);
	const [formation, setFormation] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setFormation({data: formation.data, isLoading: true});
		
		try {
			const response = await fetch('/api/formation/');
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();

			setFormation({data: data_in, isLoading: false});
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

export default FetchFormation;