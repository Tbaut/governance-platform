import React from 'react';
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { UserDetailsProvider } from './context/UserDetailsContext';
import Home from './screens/Home';
import LoginForm from './screens/LoginForm';
import MenuBar from './screens/MenuBar';
import Post from './screens/Post';
import SignupForm from './screens/SignupForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts.css' /* as createGlobalStyle is not importing fonts*/
import { createGlobalStyle } from 'styled-components'


export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background-color: #F1F3F2;
		color: #282828;
	}

	code {
		font-family: 'Roboto Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
		  monospace;
	  }

	ul {
		padding: 0;
	}
	
	li {
		list-style-type: none;
	}

	a:hover {
		text-decoration: none;
	}

	.container-fluid {
		max-width: 1200px;
		padding: 0 2.5rem 0 2.5rem;
		margin: 3.75rem auto 0 auto;
	  }

	@media (max-width: 1200px) {
		.container-fluid {
		padding: 0 2.5rem 0 2.5rem;
		}
	}

	@media (max-width: 768px) {
		.container-fluid {
		margin: 2.5rem auto 0 auto;
		padding: 0 1.25rem 0 1.25rem;
		}
	}

	@media (max-width: 576px) {
		.container-fluid {
		padding:0;
		}
	}

	h3 {
		font-family: 'Roboto Mono';
		font-size: 1.875rem;
		font-weight: 500;
		color: #222;
		margin-bottom: 1.25rem;
	}

	.btn {
		font-family: 'Roboto Mono';
		font-size: 1.125rem;
		font-weight: 500;
		text-transform: uppercase;
		border-radius: 0.188rem;
		border: none;
	}
	
	.btn-primary {
		background-color: #EB5757;
	}
	
	.btn-primary:hover {
		background-color: #CC3D3D;
	}
`


const App = () => {
	return (
		<React.Fragment>
			<GlobalStyle />
			<Router>
				<UserDetailsProvider>
					<MenuBar/>
					<Container fluid={true}>
						<Switch>
							<Route exact path="/">
								<Home/>
							</Route>
							<Route path="/login">
								<LoginForm/>
							</Route>
							<Route exact path="/post/:id" >
								<Post/>
							</Route>
							<Route path="/signup">
								<SignupForm/>
							</Route>
						</Switch>
					</Container>
				</UserDetailsProvider>
			</Router>
		</React.Fragment>
	);
};

export default App;