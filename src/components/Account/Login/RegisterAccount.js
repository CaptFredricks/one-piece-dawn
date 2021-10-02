import RegisterForm from './RegisterForm';
import './Login.css';

const RegisterAccount = () => {
	let content = <div className="content">
					<RegisterForm />
				</div>;
	
	return (
		<main>
			{content}
		</main>
	);
};

export default RegisterAccount;