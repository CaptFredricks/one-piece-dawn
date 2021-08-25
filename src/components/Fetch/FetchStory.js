import { useState, useEffect, useCallback, useRef } from 'react';

const FetchStory = (current_stage) => {
	const hasFetched = useRef(false);
	const [story, setStory] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setStory({data: story.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/story/${current_stage}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();
			
			setStory({data: dataIn, isLoading: false});
		} catch(err) {
			console.log(err);
		}
	}, [story.data, current_stage]);
	
	useEffect(() => {
		if(!hasFetched.current && current_stage !== undefined) {
			fetchData();
			hasFetched.current = true;
		}
	}, [fetchData, current_stage]);
	
	return story;
};

export default FetchStory;