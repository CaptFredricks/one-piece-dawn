import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import FetchAccount from './components/Fetch/FetchAccount';
import Menu from './components/Menu';
import Story from './components/Story/Story';
import Formation from './components/Formation/Formation';
import Characters from './components/Characters/Characters';
import Account from './components/Account/Account';
import RegisterAccount from './components/Account/Login/RegisterAccount';
import Login from './components/Account/Login/Login';
import './assets/font-awesome.min.css';
import './assets/font-awesome-rules.min.css';
import './App.css';

const App = () => {
	const [cookies] = useCookies(['session']);
	
	// Fetch account data
	const account = FetchAccount();
	
	const [content, setContent] = useState(<p>Welcome to One Piece Dawn!</p>);
	let has_loaded = false;
	let is_logged_in = false;
	let login_form = true;
	
	const switchForm = useCallback((login_form) => {
		if(login_form) {
			// Show the login form
			setContent(
				<div>
					<Route path="/" component={Login} />
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
	
	if(Object.keys(account.data).length > 0) has_loaded = true;
	if(Object.keys(cookies).length > 0) is_logged_in = true;
	
	useEffect(() => {
		if(account.isLoading) setContent(<p>Loading...</p>);
		
		if(has_loaded && is_logged_in) {
			setContent(
				<Switch>
					<Route exact={true} path="/" component={Menu} />
					<Route path="/story/" component={Story} />
					<Route path="/formation/" component={Formation} />
					<Route path="/characters/" component={Characters} />
					<Route path="/account/" component={Account} />
				</Switch>
			);
		} else if(!has_loaded && !is_logged_in) {
			switchForm(login_form);
		}
	}, [account.isLoading, has_loaded, is_logged_in, switchForm, login_form]);
	
	return (
		<div className="App">
			{content}
		</div>
	);
};

export default App;
