import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <Container>
        <h1>Home</h1>
        <p>
          <Link to="/login/">Login</Link>
        </p>
        <p>
          <Link to="/signup">Sign up</Link>
        </p>
        <p>
          <Link to="/catalog">Catalog</Link>
        </p>
      </Container>
    );
  }
}

export default Home;
