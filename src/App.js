import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import FetchAccount from './components/Fetch/FetchAccount';
import Menu from './components/Menu';
import Story from './components/Story/Story';
import Formation from './components/Formation/Formation';
import Characters from './components/Characters/Characters';
import Account from './components/Account/Account';
import Redeem from './components/Redeem/Redeem';
import RegisterAccount from './components/Account/Login/RegisterAccount';
import Login from './components/Account/Login/Login';
import useToken from './useToken';
import './assets/font-awesome.min.css';
import './assets/font-awesome-rules.min.css';
import './App.css';

const App = () => {
	const { token, setToken } = useToken();
	//const { account, setAccount } = useAccount();
	const [content, setContent] = useState(<p>Welcome to One Piece Dawn!</p>);
	let has_loaded = false;
	let is_logged_in = false;
	let login_form = true;
	
	const switchForm = useCallback((login_form) => {
		if(login_form) {
			// Show the login form
			setContent(
				<div>
					<Route path="/">
						<Login setToken={setToken} />
					</Route>
					<button className="button" onClick={() => switchForm(!login_form)}>Register</button>
				</div>
			);
		} else {
			// Show the register form
			setContent(
				<div>
					<Route path="/" component={RegisterAccount} />
					<button className="button" onClick={() => switchForm(!login_form)}>Log In</button>
				</div>
			);
		}
	}, []);
	
	// Fetch account data
	const account = FetchAccount(token);
	
	if(Object.keys(account.data).length > 0) has_loaded = true;
	if(token) is_logged_in = true;
	
	useEffect(() => {
		if(account.isLoading) setContent(<p>Loading...</p>);
		
		if(has_loaded && is_logged_in) {
			setContent(
				<Switch>
					<Route exact={true} path="/" component={Menu} />
					<Route path="/story/">
						<Story token={token} />
					</Route>
					<Route path="/formation/">
						<Formation token={token} />
					</Route>
					<Route path="/characters/">
						<Characters token={token} />
					</Route>
					<Route path="/account/">
						<Account token={token} />
					</Route>
					<Route path="/redeem/">
						<Redeem token={token} />
					</Route>
				</Switch>
			);
		} else if(!has_loaded && !is_logged_in) {
			switchForm(login_form);
		}
	}, [account.isLoading, has_loaded, is_logged_in, token, switchForm, login_form]);
	
	return (
		<div className="App">
			{content}
		</div>
	);
};

export default App;
