import React, { useState, useContext, FC } from 'react';
import Button from 'react-bootstrap/Button';
import { FormControlProps } from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { useCreatePostMutation, useCategoriesQuery } from '../../generated/graphql';
import { UserDetailsContext } from '../../context/UserDetailsContext'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import styled from 'styled-components'

interface Props {
	className?: string
}

const CreatePost = ({ className }: Props) => {
	const [title, setTitle] = useState<string | undefined>('');
	const [content, setContent] = useState<string | undefined>('');
	const [selectedCategory, setSetlectedCategorie] = useState<number | null>(null);
	const currentUser = useContext(UserDetailsContext);
	const { data: catData, loading: catLoading, error: catError } = useCategoriesQuery()
	const [createPostMutation, { data, loading, error }] = useCreatePostMutation();
	// const [errors, setErrors] = useState<Array<string>>([])

	const handleSend = () => {
		if (currentUser.id && title && content && selectedCategory){
			createPostMutation({ variables: {
				cat: selectedCategory,
				content,
				title,
				userId: currentUser.id
			} })
		}

	}

	const onTitleChange = (event: React.FormEvent<FormControlProps>) => setTitle(event.currentTarget.value);
	const onContentChange = (event: React.FormEvent<FormControlProps>) => setContent(event.currentTarget.value);

	const renderCategories = () => {
		if (!catData || !catData.categories) return null
		
		return (
			<ButtonGroup aria-label="Categorie" size="sm">
				{ catData.categories.map(({ id, name } : {name: string, id:number}) => {
					return <Button key={id} variant="secondary" onClick={() => setSetlectedCategorie(id)}>{name}</Button>
				})}
			</ButtonGroup>			
		);
	}
	if (loading || catLoading) {
		return <div>Loading...</div>;
	}

	if (error || catError) {
		return <div>ERROR</div>;
	}

	return (
		<Row className={className}>
			<Col xs={0} sm={0} md={2} lg={2}/>
			<Col xs={12} sm={12} md={8} lg={8}>
				<Form>
					<h3>New Post</h3>
					<Form.Group controlId="postTitle">
						<Form.Label>Title</Form.Label>
						<Form.Control
							onChange={onTitleChange}
							placeholder="Your title..."
							type="text"
						/>
					</Form.Group>

					<Form.Group controlId="formSignInPassword">
						<Form.Label>Content</Form.Label>
						<Form.Control
							as="textarea"
							onChange={onContentChange}
							placeholder="The content of your post..."
							type="password"
							rows="3"
						/>
					</Form.Group>
					{renderCategories()}
					<div className={'mainButtonContainer'}> 
						<Button
							onClick={handleSend}
							type='submit'
							variant='primary'
						>
							Create
						</Button>
					</div>
				</Form>
			</Col>
			<Col xs={0} sm={0} md={2} lg={2}/>
		</Row>
	);
};

export default styled(CreatePost)`
	color: 'red'

	.mainButtonContainer {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center'
	}
	
`