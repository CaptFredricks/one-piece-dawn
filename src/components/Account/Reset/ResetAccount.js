import { Link } from 'react-router-dom';
import ResetAccountForm from './ResetAccountForm';

const ResetAccount = (props) => {
	let content = <div className="content">
					<ResetAccountForm id={props.id} />
				</div>;
	
	return (
		<main>
			<div className="breadcrumb">
				<Link to="/">Menu</Link> &rsaquo; <Link to="/account/">Account</Link> &rsaquo; Reset Account
			</div>
			{content}
		</main>
	);
};

export default ResetAccount;