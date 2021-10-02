import { useState, useEffect, useCallback, useRef } from 'react';

const FetchLogin = () => {
	const has_fetched = useRef(false);
	const [login, setLogin] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setLogin({data: login.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/account/login-status/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			setLogin({data: data_in, isLoading: false});
		} catch(err) {
			console.log(err);
		}
	}, [login.data, current_stage]);
	
	useEffect(() => {
		if(!has_fetched.current && current_stage !== undefined && current_stage <= story_stages) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData, current_stage, story_stages]);
	
	return login;
};

export default FetchLogin;