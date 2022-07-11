import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	
	const submitData = useCallback(async e => {
		e.preventDefault();
		
		if(username !== '' && password !== '') {
			fetch('/api/account/login/', {
				method: 'POST',
				body: JSON.stringify({ username, password })
			}).then(response => {
				return response.text();
			}).then(response_text => {
				let text = JSON.parse(response_text);
				
				if(text.error != null) {
					setError(<p className="error">{text.error}</p>);
				}
				
				if(text.token != null) {
					props.setToken(text);
					setError(null);
					console.log('Logged in.');
				}
			});
		} else {
			e.preventDefault();
			setError(<p className="error">Please fill out all fields!</p>);
		}
	}, [props, username, password]);
	
	return (
		<form className="login-form" onSubmit={submitData}>
			<h1>Account Login</h1>
			<label>Username:
				<input value={username} onChange={
					e => setUsername(e.target.value)
				} />
			</label>
			<label>Password:
				<input value={password} onChange={
					e => setPassword(e.target.value)
				} />
			</label>
			{error}
			<input type="submit" className="button" name="submit_form" value="Log In" />
		</form>
	);
}

LoginForm.propTypes = {
	setToken: PropTypes.func.isRequired
};

export default LoginForm;