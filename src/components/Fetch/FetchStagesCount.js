import { useState, useEffect, useCallback, useRef } from 'react';

const FetchStagesCount = (current_stage) => {
	const has_fetched = useRef(false);
	const [stages, setStages] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setStages({data: stages.data, isLoading: true});
		
		try {
			const response = await fetch('/api/stages/');
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			setStages({data: data_in, isLoading: false});
		} catch(err) {
			console.log(err);
		}
	}, [stages.data]);
	
	useEffect(() => {
		if(!has_fetched.current) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData]);
	
	return stages;
};

export default FetchStagesCount;