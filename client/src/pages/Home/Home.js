import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import CreatePostForm from "../../components/CreatePostForm";
import PostsList from "../../components/PostsList";
import "./index.css"

function Home() {
  return (
    <Container  fluid>
      <Row>
        <Col size="md-4">
          <CreatePostForm />
        </Col>
        <Col size="md-4 sm-12">
          <PostsList />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
