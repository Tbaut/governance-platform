import * as React from 'react';
import { LatestPostsQuery } from '../../generated/graphql';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as moment from 'moment';


interface Props {
  data: LatestPostsQuery;
}

const className = 'Home';

const Home: React.FC<Props> = ({ data }) => (
  <div className={className}>
      <h3>Latest posts</h3>
      <Row>
        <Col md={6} lg={8}>
          <ul className={`${className}__list`}>
            {!!data.posts &&
              data.posts.map(
                (post) =>
                  !!post && (
                    <li key={post.id} className={`${className}__item`}>
                      <Link to={`/post/${post.id}`}>
                        <li style={{color:"#282828", fontWeight: 500, fontSize: "18px", marginBottom: "5px"}}>{post.title}</li>
                        <li style={{color:"#555", fontSize: "14px"}}>posted by {post.author.username} ({post.creation_date})</li>
                      </Link>
                    </li>
                  ),
              )}
          </ul>
        </Col>
        <Col>
          <h5>Hello</h5>
        </Col>
      </Row>
  </div>
);

export default Home;