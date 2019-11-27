import React, { useState, useEffect } from 'react';

import { useLatestPostsQuery } from '../../generated/graphql';
import Home from './Home';
import { getToken } from '../../services/auth.service';

const HomeContainer = () => {
	const [token, setToken] = useState<string|null>(null)

	useEffect(() => {
		getToken().then(t => setToken(t))
	},[])

	const { data, error, loading } = useLatestPostsQuery({ 
		context: {
			headers: 
				token ? {
					'authorization': 'Bearer ' + token
				} : null
		} 
	});

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error || !data) {
		return <div>ERROR</div>;
	}

	return <Home data={data} />;
};

export default HomeContainer;