import { useState, useEffect, useCallback, useRef } from 'react';

const FetchStory = (current_stage, story_stages) => {
	const has_fetched = useRef(false);
	const [story, setStory] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setStory({data: story.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/story/${current_stage}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			setStory({data: data_in, isLoading: false});
		} catch(err) {
			console.log(err);
		}
	}, [story.data, current_stage]);
	
	useEffect(() => {
		if(!has_fetched.current && current_stage !== undefined && current_stage <= story_stages) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData, current_stage, story_stages]);
	
	return story;
};

export default FetchStory;