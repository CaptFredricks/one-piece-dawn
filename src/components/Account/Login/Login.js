import LoginForm from './LoginForm';
import './Login.css';

const Login = (props) => {
	let content = <div className="content">
					<LoginForm setToken={props.setToken} />
				</div>;
	
	return (
		<main>
			{content}
		</main>
	);
};

export default Login;