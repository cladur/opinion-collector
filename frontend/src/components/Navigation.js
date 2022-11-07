import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { withRouter } from "react-router-dom"; // new import
import { connect } from "react-redux"; // new import

import { logout } from "./login/LoginActions";

class Navigation extends Component {
  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  getUserName() {
    var userData = localStorage.getItem("user");
    var json = JSON.parse(userData);
    if (json) {
      return json.username;
    }
    return "";
  }

  onLogout = () => {
    this.props.logout();
  };

  userContent() {
    if (this.isAuthenticated()) {
      return (
        <Nav>
          <Nav.Link href="/settings">
            User: <b>{this.getUserName()}</b>
          </Nav.Link>
          <Nav.Link onClick={this.onLogout}>Logout</Nav.Link>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
        </Nav>
      );
    }
  }

  handleRefresh = () => {
    // by calling this method react re-renders the component
    this.setState({});
  };

  render() {
    return (
      <Navbar bg="light" expand="lg" margin="0" padding="0">
        <Container>
          <Navbar.Brand href="/">Opinion Collector</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/catalog">Catalog</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {this.userContent()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(withRouter(Navigation));
