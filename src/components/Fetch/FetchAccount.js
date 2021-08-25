import { useState, useEffect, useCallback, useRef } from 'react';

const FetchAccount = () => {
	const hasFetched = useRef(false);
	const [account, setAccount] = useState({data: [], isLoading: false});
	
	const fetchData = useCallback(async () => {
		setAccount({data: account.data, isLoading: true});
		
		try {
			const response = await fetch('/api/account/');
			
			if(!response.ok) {
				throw new Error('Something went wrong!');
			}
			
			const dataIn = await response.json();
			
			setAccount({data: dataIn, isLoading: false});
		} catch(err) {
			console.log(err.message);
		}
	}, [account.data]);
	
	useEffect(() => {
		if(!hasFetched.current) {
			fetchData();
			hasFetched.current = true;
		}
	}, [fetchData]);
	
	return account;
};

export default FetchAccount;