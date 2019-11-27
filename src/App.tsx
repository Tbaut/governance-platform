import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { GlobalStyle } from './components/GlobalStyle'
import { UserDetailsProvider } from './context/UserDetailsContext';
import Home from './screens/Home';
import LoginForm from './screens/LoginForm';
import MenuBar from './screens/MenuBar';
import Post from './screens/Post';
import SignupForm from './screens/SignupForm';

const client = new ApolloClient({
	uri: process.env.REACT_APP_HASURA_GRAPHQL_URL
});

const App = () => {
	return (
		<>
			<GlobalStyle />
			<Router>
				<UserDetailsProvider>
					<ApolloProvider client={client}>
						<ApolloHooksProvider client={client}>
							<MenuBar/>
							<Container fluid={true}>
								<Switch>
									<Route exact path="/">
										<Home/>
									</Route>
									<Route path="/temp-login">
										<LoginForm/>
									</Route>
									<Route exact path="/temp-post/:id" >
										<Post/>
									</Route>
									<Route path="/temp-signup">
										<SignupForm/>
									</Route>
								</Switch>
							</Container>
						</ApolloHooksProvider>
					</ApolloProvider>
				</UserDetailsProvider>
			</Router>
		</>
	);
};

export default App;