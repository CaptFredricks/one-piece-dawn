import { useState, useEffect, useCallback, useRef } from 'react';

const FetchFormation = () => {
	const hasFetched = useRef(false);
	const [formation, setFormation] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setFormation({data: formation.data, isLoading: true});
		
		try {
			const response = await fetch('/api/formation/');
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();

			setFormation({data: dataIn, isLoading: false});
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

export default FetchFormation;