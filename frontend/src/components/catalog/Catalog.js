import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container } from "react-bootstrap";
import { logout } from "../login/LoginActions";

import Search from "./Search";

class Catalog extends Component {
  onLogout = () => {
    this.props.logout();
  };

  render() {
    return <Search />;
  }
}

Catalog.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(withRouter(Catalog));
