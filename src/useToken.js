import { useState } from 'react';

const useToken = () => {
	const getToken = () => {
		const token_string = localStorage.getItem('token');
		const user_token = JSON.parse(token_string);
		
		return user_token?.token;
	};
	
	const [token, setToken] = useState(getToken());
	
	const saveToken = (user_token) => {
		//let expires = new Date();
		
		// Set the cookie to expire in 2 weeks
		//expires.setDate(expires.getDate() + 14);
		
		//document.cookie = 'opd-token=' + user_token.token + ';path=\'/\';expires=' + expires + ';samesite=none;secure';
		localStorage.setItem('token', JSON.stringify(user_token));
		setToken(user_token.token);
	}
	
	return {
		setToken: saveToken, token
	};
};

export default useToken;