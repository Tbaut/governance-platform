import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { getRawToken } from './services/auth.service'
import './index.css';
import App from './App';

getRawToken().then((token) => {
	const headers = token ? { 'Authorization': 'Bearer ' + token } : null;
	console.log('headers',headers)
	const client = new ApolloClient({
		headers,
		uri: process.env.REACT_APP_HASURA_GRAPHQL_URL
	});
	ReactDOM.render(
		<ApolloProvider client={client}>
			<ApolloHooksProvider client={client}>
				<App />
			</ApolloHooksProvider>
		</ApolloProvider>,
		document.getElementById('root'),
	);
});	
