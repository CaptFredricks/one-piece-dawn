import { Link } from 'react-router-dom';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = (props) => {
	let content = <div className="content">
					<ResetPasswordForm id={props.id} />
				</div>;
	
	return (
		<main>
			<div className="breadcrumb">
				<Link to="/">Menu</Link> &rsaquo; <Link to="/account/">Account</Link> &rsaquo; Reset Password
			</div>
			{content}
		</main>
	);
};

export default ResetPassword;