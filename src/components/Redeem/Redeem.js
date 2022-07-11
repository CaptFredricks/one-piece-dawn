import React from 'react';
import { Link } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import RedeemForm from './RedeemForm';
import './Redeem.css';

const Redeem = (props) => {
	// Fetch account data
	const account = FetchAccount(props.token);
	
	let content = <p>No account data found!</p>;
	
	if(Object.keys(account.data).length > 0) {
		content = <div className="content">
					<RedeemForm id={account.data.id} />
				</div>;
	}
	
	if(account.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<div className="wrapper">
			<main>
				<div className="breadcrumb">
					<Link to="/">Menu</Link> &rsaquo; Redeem
				</div>
				{content}
			</main>
		</div>
	);
};

export default Redeem;