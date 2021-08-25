import React from 'react';
import { Link, Route } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import EditAccount from './EditAccount';
import Belly from '../../assets/Belly.png';
import './Account.css';

const Account = () => {
	const path = '/account/';
	
	// Fetch account data
	const account = FetchAccount();
	
	let content = <p>No account data found!</p>;
	
	if(Object.keys(account.data).length > 0) {
		content = <div className="content">
					<div className="account">
						<h1>{account.data.username}</h1>
						<dl>
							<dt>Email</dt>
							<dd>{account.data.email}</dd>
							<dt>Current Stage</dt>
							<dd>{account.data.current_stage}</dd>
							<dt>Belly</dt>
							<dd>
								<span><img src={Belly} alt="Belly" />{account.data.belly}</span>
							</dd>
							<dt>Level Points</dt>
							<dd>{account.data.lvl_points}</dd>
						</dl>
					</div>
				</div>;
	}
	
	if(account.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<div className="wrapper">
			<Route exact={true} path={path}>
				<main>
					<div className="breadcrumb">
						<Link to="/">Menu</Link> &rsaquo; Account
					</div>
					{content}
					<Link to={`${path}edit/`} className="button">Edit Account</Link>
				</main>
			</Route>
			<Route path={`${path}edit/`} component={EditAccount} />
		</div>
	);
};

export default Account;