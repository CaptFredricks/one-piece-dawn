import { useState, useEffect, useCallback, useRef } from 'react';

const FetchStory = (current_stage) => {
	const has_fetched = useRef(false);
	const [story, setStory] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setStory({data: story.data, isLoading: true});
		
		try {
			const response = await fetch('/api/story/stages/');
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			setStory({data: data_in, isLoading: false});
		} catch(err) {
			console.log(err);
		}
	}, [story.data]);
	
	useEffect(() => {
		if(!has_fetched.current) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData]);
	
	return story;
};

export default FetchStory;