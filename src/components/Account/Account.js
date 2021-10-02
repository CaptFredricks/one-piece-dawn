import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import EditAccount from './EditAccount';
import ResetPassword from './Reset/ResetPassword';
import ResetAccount from './Reset/ResetAccount';
import Logout from './Login/Logout';
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
						<div className="panels">
							<div className="left-panel">
								<dl>
									<dt>Email</dt>
									<dd>{account.data.email}</dd>
									<dt>Current Stage</dt>
									<dd>{account.data.current_stage}</dd>
									<dt>Belly</dt>
									<dd>
										<span>
											<img src={Belly} title="Belly" alt="Belly" />{account.data.belly}
										</span>
									</dd>
									<dt>Medallions</dt>
									<dd>{account.data.medallions}</dd>
								</dl>
							</div>
							<div className="right-panel">
								<ul>
									<li>
										<Link to={`${path}edit/`} className="button">Edit Account Details</Link>
									</li>
									<li>
										<Link to={`${path}reset-pw/`} className="button">Reset Password</Link>
									</li>
									<li>
										<Link to={`${path}reset-acct/`} className="button">Reset Account</Link>
									</li>
									<li>
										<Logout />
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>;
	}
	
	if(account.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<div className="wrapper">
			<Switch>
				<Route exact={true} path={path}>
					<main>
						<div className="breadcrumb">
							<Link to="/">Menu</Link> &rsaquo; Account
						</div>
						{content}
					</main>
				</Route>
				<Route path={`${path}edit/`} component={EditAccount} />
				<Route path={`${path}reset-pw/`}>
					<ResetPassword id={account.data.id} />
				</Route>
				<Route path={`${path}reset-acct/`}>
					<ResetAccount id={account.data.id} />
				</Route>
			</Switch>
		</div>
	);
};

export default Account;