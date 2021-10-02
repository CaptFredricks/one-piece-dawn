import LoginForm from './LoginForm';
import './Login.css';

const Login = () => {
	let content = <div className="content">
					<LoginForm />
				</div>;
	
	return (
		<main>
			{content}
		</main>
	);
};

export default Login;