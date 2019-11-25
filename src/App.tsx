import React from 'react';
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { UserDetailsProvider } from './context/UserDetailsContext';
import CreatePost from './screens/CreatePost';
import Home from './screens/Home';
import LoginForm from './screens/LoginForm';
import MenuBar from './screens/MenuBar';
import Post from './screens/Post';
import SignupForm from './screens/SignupForm';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
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
						<Route path="/post/create" >
							<CreatePost/>
						</Route>
						<Route exact path="/posts/:id" >
							<Post/>
						</Route>
						<Route path="/signup">
							<SignupForm/>
						</Route>
					</Switch>
				</Container>
			</UserDetailsProvider>
		</Router>
	);
};

export default App;