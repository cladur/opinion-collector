import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container } from "react-bootstrap";
import { logout } from "../login/LoginActions";

import Search from "../search/Search";

class AdminDashboard extends Component {
  onLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div>
        <Container>
          <h1>DASHBOARD WIP</h1>
        </Container>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(withRouter(AdminDashboard));
