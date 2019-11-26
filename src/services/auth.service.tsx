// import * as React from 'react'
// import { useContext } from 'react'
// import {Query} from 'react-apollo'
// import { MeDocument, MeQuery, MeQueryVariables, useMeQuery, useMeLazyQuery } from '../generated/graphql'
import { LoginObjectType, SignupObjectType, SignupResponseObjectType, UserDetailsContextType } from '../types'
// import { UserDetailsContext } from '../context/UserDetailsContext'
import parseJwt from '../util/parseJWT'

export const storeAuthHeader = (auth: string) => {
	localStorage.setItem('Authorization', 'Bearer '+auth)
}

export const getAuthHeader = (): string | null => {
	let token = localStorage.getItem('Authorization') || null;

	if (token) {
		const tokenPayload = parseJwt(token);
		const isExpired = tokenPayload.exp < Date.now()/1000
		
		// if(isExpired){
		// 	refreshToken();
		// }

		// always refresh
		refreshToken();

	}
	return token
}

const refreshToken = (): void => {
	fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/token`, {
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST'
	})
		.then(async (response) => {
			if (response.status < 400 && response.ok) {
				response.json().then((data) => {
					console.log('new token',data.token)
				})

				//   const token = data.token;
				// storeAuthHeader(token);
				// return data;
				// });
			} else {
				const error = await response.json()
					.then((data) => {
						console.log('Authservice login error',data.errors);
						return data.errors;
					})
				throw new Error(error);
			}
		});
}

export const login = ({ username, password } : LoginObjectType) => {

	return fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/login`, {
		body: JSON.stringify({ password, username }),
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST'
	})
		.then(async (response) => {
			if (response.status < 400 && response.ok) {
				return response
				// .json().then((data) => {
				//   const token = data.token;
				// storeAuthHeader(token);
				// return data;
				// });
			} else {
				// console.log('res.statusText',res.statusText)
				const error = await response.json()
					.then((data) => {
						console.error('Authservice login error',data.errors);
						return data.errors;
					})

				throw new Error(error);
				//Promise.reject(
       
				//))
			}
		});
}

export const signUp = (SignupData: SignupObjectType) => {
	return fetch(`${process.env.REACT_APP_AUTH_SERVER_URL}/signup`, {
		body: JSON.stringify(SignupData),
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'POST'
	})
		.then((response) => {
			if(response.status < 400 && response.ok) {
				return response
			} else {
				// FIXME we need to throw here and remove this ugly alert
				alert('Could not signup now. Try again later');
			}
		})
		.catch(error => {
			console.log(error.message || error)
			return error
		})
}

export  const loginUser = ({ user, token }: SignupResponseObjectType, currentUser:UserDetailsContextType) => {
	storeAuthHeader(token);
	currentUser.setUserDetailsContextState((prevState) => {
		return {
			...prevState,
			id: user.id,
			username: user.username
		}  
	})       
}

// export const signOut = () => {
//   localStorage.removeItem('Authorization')
//   // window.location.href = '/sign-in'

//   return store.clearStore()
// }

export default {
	// withAuth,
	getAuthHeader,
	login,
	signUp,
	storeAuthHeader
	// signOut,
}
