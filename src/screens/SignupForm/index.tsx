import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FormControlProps } from 'react-bootstrap';
import { signUp, handleLoginUser } from '../../services/auth.service';
import { UserDetailsContext } from '../../context/UserDetailsContext';
import { useHistory } from 'react-router-dom';

const SignupForm = (): JSX.Element => {
	const [email, setEmail] = useState<string | undefined>('');
	const [username, setUsername] = useState<string | undefined>('');
	const [password, setPassword] = useState<string | undefined>('');
	const history = useHistory();
	const currentUser = useContext(UserDetailsContext)
    
	const onEmailChange = (event: React.FormEvent<FormControlProps>) => setEmail(event.currentTarget.value);
	const onUserNameChange = (event: React.FormEvent<FormControlProps>) => setUsername(event.currentTarget.value);
	const onPasswordChange = (event: React.FormEvent<FormControlProps>) => setPassword(event.currentTarget.value);
    
	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
		event.preventDefault();
		event.stopPropagation();
		if (username && email && password){
			signUp({ email ,password, username })
				.then((data) => data.json())
				.then((data) => {
					handleLoginUser(data, currentUser);
					// redirect to the home
					history.push('/');
				})
		}
	}

	return (
		<Form>
			<Form.Group controlId="formSignIn">
				<Form.Label>Username</Form.Label>
				<Form.Control
					onChange={onUserNameChange}
					placeholder="John"
					type="text"
				/>
				<Form.Label>Email</Form.Label>
				<Form.Control
					onChange={onEmailChange}
					placeholder="john@doe.com"
					type="email"
				/>
				<Form.Text className="text-muted">
                We`&apos;`ll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group controlId="formSignInPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control
					onChange={onPasswordChange}
					placeholder="Password"
					type="password"
				/>
			</Form.Group>
			<Button
				onClick={handleClick}
				type="submit"
				variant="primary"
			>
                Sign-up
			</Button>
		</Form>
	)
};

export default SignupForm;