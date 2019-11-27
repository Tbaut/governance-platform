import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { storeLocalStorageToken, getLocalStorageToken } from './services/auth.service';
import parseJwt from './util/parseJWT';

const isLocalStorageTokenValid = (): boolean => {
	let token = localStorage.getItem('Authorization') || null;

	if (token) {
		const tokenPayload = parseJwt(token);
		return tokenPayload.exp > Date.now() / 1000
	} else {
		return false
	}
};

const setAuthorizationLink = setContext((request, previousContext) => {
	const token = getLocalStorageToken()
	if (token) {
		return { headers: { authorization: `Bearer ${token}` } }
	} else {
		return null
	}
		
});

const httpLink = new HttpLink({
	uri: process.env.REACT_APP_HASURA_GRAPHQL_URL
});

const link = ApolloLink.from([
	new TokenRefreshLink({
		accessTokenField: 'token',
		fetchAccessToken: () => {
			console.log('fetchAccessToken')
			return fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/token`, {
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'POST'
			});
		},
		handleError: (err:any) => {
			// full control over handling token fetch Error
			console.warn('Your refresh token is invalid. Try to relogin');
			console.error(err);

			// your custom action here
			// user.logout();
		},
		handleFetch: (accessToken: string) => {
			console.log('handleFetch accessToken',accessToken)
			// const accessTokenDecrypted = jwtDecode(accessToken);
			storeLocalStorageToken(accessToken)
		},
		// handleResponse: (operation:any, accessTokenField:any) => response => {
		// 	// here you can parse response, handle errors, prepare returned token to
		// 	// further operations

		// 	// returned object should be like this:
		// 	// {
		// 	//    access_token: 'token string here'
		// 	// }
		// },
		isTokenValidOrUndefined: () => {
			const r = isLocalStorageTokenValid()
			console.log('is it valid?',r)
			return r
		}
	}),
	setAuthorizationLink,
	httpLink
])
  
export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	
	document.getElementById('root'),
);
