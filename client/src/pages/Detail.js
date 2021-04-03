import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import {SET_CURRENT_POST} from "../utils/actions";

function Detail(props) {

  const {id} = useParams();

  const [state, dispatch] = useStoreContext();

  const loadPost = async () => {
    
    try {
      const response = await API.getPost(id);

      dispatch({ type: SET_CURRENT_POST, post: response.data });

    } catch(error) {
      console.log(error);
    }

  }
  useEffect(() => {
    loadPost();
  }, []);

  return (
    <>{/* Replace `true` with the state of your application */}{state.currentPost._id ? (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>{state.currentPost.author}</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>{state.currentPost.location}</h1>
              <p>{state.currentPost.body}</p>
            </article>
          </Col>
          {/* Replace `false` to check if the current post is in the favorites list */}
          {false ? (
            <button className="btn btn-danger">Remove from Favorites!</button>
          ) : (
            <button className="btn">❤️ Add to Favorites</button>
          )}
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Posts</Link>
          </Col>
        </Row>
      </Container>
    ) : (
      <div>loading...</div>
    )}</>
  );
}

export default Detail;
