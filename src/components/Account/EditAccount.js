import React from 'react';
import { Link } from 'react-router-dom';
import FetchAccount from '../Fetch/FetchAccount';
import AccountForm from './AccountForm';

const EditAccount = ({ match }) => {
	// Fetch account data
	const account = FetchAccount();
	
	let content = <div className="content">
					<AccountForm data={account.data} />
				</div>;
	
	if(account.isLoading) {
		content = <p>Loading...</p>;
	}
	
	return (
		<main>
			<div className="breadcrumb">
				<Link to="/">Menu</Link> &rsaquo; <Link to="/account/">Account</Link> &rsaquo; Edit
			</div>
			{content}
		</main>
	);
};

export default EditAccount;