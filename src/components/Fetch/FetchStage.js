import { useState, useEffect, useCallback, useRef } from 'react';

const FetchStage = (current_stage, story_stages) => {
	const has_fetched = useRef(false);
	const [stage, setStage] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setStage({data: stage.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/stages/${current_stage}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			setStage({data: data_in, isLoading: false});
		} catch(err) {
			console.log(err);
		}
	}, [stage.data, current_stage]);
	
	useEffect(() => {
		if(!has_fetched.current && current_stage !== undefined && current_stage <= story_stages) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData, current_stage, story_stages]);
	
	return stage;
};

export default FetchStage;