import { useState, useEffect, useCallback, useRef } from 'react';

const FetchFormationStage = (stage) => {
	const hasFetched = useRef(false);
	const [formation, setFormation] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setFormation({data: formation.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/formation/${stage}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();

			setFormation({data: dataIn, isLoading: false});
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

export default FetchFormationStage;