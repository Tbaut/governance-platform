import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import './index.css';
import App from './App';

const client = new ApolloClient({
	headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2IiwibmFtZSI6ImJvdGJvdCIsImlhdCI6MTU3NDcyMTkzNiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiI2IiwieC1oYXN1cmEtdXNlci1lbWFpbCI6ImJvdGJvdCJ9LCJleHAiOjE1NzQ3MjU1MzZ9.TJReuzZpLZ8mp4fFwY2TpRo1xHTx6d22ROu82OBFboM' },
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
