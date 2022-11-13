import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import defaultImage from "../../assets/img/default.svg";
import { logout } from "../login/LoginActions";
import { getProducts } from "../product_api/ProductsActions";

class Search extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  onLogout = () => {
    this.props.logout();
  };

  render() {
    const { products } = this.props.products;
    const { user } = this.props.auth;

    return (
        <Container>
          <InputGroup className="mb-3 mt-3">
            <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
            <Form.Control
              placeholder="Type here to search..."
              aria-label="Type here to search..."
            />
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {products.map((product) => (
              <Card style={{ width: "18rem", margin: "1rem" }} key={product.id}>
                  <Card.Link href={"/products/" + product.id}>
                    <Card.Img variant="top" src={defaultImage}/>
                  </Card.Link>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>{product.ingredients}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
    );
  }
}

Search.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProducts,
  logout,
})(withRouter(Search));
