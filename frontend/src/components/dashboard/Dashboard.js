import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container } from "react-bootstrap";
import { logout } from "../login/LoginActions";

import ProductsList from "../products/ProductsList";
import AddProduct from "../products/AddProduct";

class Dashboard extends Component {
  onLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div>
        <Container>
          <ProductsList />
          <AddProduct />
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
})(withRouter(Dashboard));
