import * as React from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';


import { LatestPostsQuery } from '../../generated/graphql';

interface Props {
  data: LatestPostsQuery;
}

const className = 'Home';

const Home: React.FC<Props> = ({ data }: Props) =>{ 
	const history = useHistory();

	const handleCreatPost = () => {
		history.push('/post/create')
	};

	return (
		<div className={className}>
			<Button onClick={handleCreatPost}>New Post</Button>
			<h3>Latest posts</h3>
			<ul className={`${className}__list`}>
				{!!data.posts &&
					data.posts.map(
						(post) =>
							!!post && (
								<li key={post.id} className={`${className}__item`}>
									<Link to={`/posts/${post.id}`}>
										{post.author.username} ({post.creation_date}): {post.title}
									</Link>
								</li>
							),
					)}
			</ul>
		</div>
	);
}

export default Home;