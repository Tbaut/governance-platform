import * as React from 'react';
import { useCreatePostMutation } from '../../generated/graphql';
import Button from 'react-bootstrap/Button';

const CreatePost = () => {
	const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
		variables: {
			cat: 1,
			content: '',
			title: '',
			userId: 1
		}
	});

	const handleSend = () => {
		createPostMutation({ variables: {
			cat: 2,
			content: 'hophop',
			title: 'piouf',
			userId: 6
		} })
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>ERROR</div>;
	}

	console.log('data',data)

	return (
		<Button onClick={handleSend}>Send</Button>
	);
};

export default CreatePost;