import { useState, useEffect, useCallback, useRef } from 'react';

const FetchAccount = (token) => {
	const has_fetched = useRef(false);
	const [account, setAccount] = useState({data: [], isLoading: false});
	token = encodeURIComponent(token);
	
	const fetchData = useCallback(async () => {
		setAccount({data: account.data, isLoading: true});
		
		try {
			const response = await fetch(`/api/account/data/${token}/`);
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const data_in = await response.json();
			
			setAccount({data: data_in, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [account.data, token]);
	
	useEffect(() => {
		if(!has_fetched.current) {
			fetchData();
			has_fetched.current = true;
		}
	}, [fetchData]);
	
	return account;
};

export default FetchAccount;