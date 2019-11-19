import * as React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import DiscussionCard from '../../components/DiscussionCard'
import { LatestPostsQuery } from '../../generated/graphql';


interface Props {
  className?: string
  data: LatestPostsQuery
}

// const className = 'Home';
const Container = styled.div`
  ul {
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  h3 {
    font-family: 'Roboto Mono';
    font-weight: 500;
    font-size: 30px;
    color: #222;
    margin-bottom: 20px;
  }

  .Home__item {
    margin: 0 0 10px 0;
    border: 1px solid #EEE;
  }

  .Home__item:hover {
    border: 1px solid #BBB;
    text-decoration: none;
  }

  .Home__item a:hover {
    text-decoration: none;
  }
`;

const Home = ({ data, className }: Props) => (
  <Container className='Home'>
      <h3>Latest posts</h3>
      <Row>
        <Col md={6} lg={8}>
          <ul className='Home__list'>
            {!!data.posts &&
              data.posts.map(
                (post) =>
                  !!post && (
                    <li key={post.id} className='Home__item'>
                      {<Link to={`/post/${post.id}`}>
                        <DiscussionCard 
                          title={post.title}
                          author={post.author.username}
                          creation_date={post.creation_date}
                          replies={post.replies.length.toString()}
                        />
                      </Link>}
                    </li>
                  ),
              )}
          </ul>
        </Col>
        <Col>
          <div>
            <h5>Hello</h5>
            <div></div>
          </div>
        </Col>
      </Row>
  </Container>
);

export default Home;