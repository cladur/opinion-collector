import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProduct } from "../product_api/ProductsActions";
import AddOpinionModal from "./AddOpinionModal";
import Button from "react-bootstrap/Button";
import { isStaff, isAuthenticated } from "../../utils/Utils";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

class Product extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  addSuggestionButton() {
    if (!isStaff() && isAuthenticated()) {
      return <Button variant="primary">Suggest change</Button>;
    }
  }

  addOpinionButton() {
    if (!isStaff() && isAuthenticated()) {
      return <AddOpinionModal />;
    }
  }

  render() {
    const { products } = this.props.products;

    if (products.length === 0) {
      return;
    }

    const product = products[0];
    return (
      <Container>
        <Row>
          <Col md="8" className="mx-auto">
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              {product.name}
            </h1>
            <Row>
              <Col>
                <h2>Description</h2>
                <p>{product.description}</p>
                <Row className="mt-5"></Row>
                <h2>Ingredients</h2>
                <p>{product.ingredients}</p>
                {this.addSuggestionButton()}
              </Col>
              <Col>
                <Image src={product.image} fluid="true" />
              </Col>
            </Row>
            <Row className="mt-5"></Row>
            <h2>Opinions {this.addOpinionButton()}</h2>
            <p>TestUserName</p>
            <p>Test opinion on this product</p>
            <p>Plusy</p>
            <ul>
              <li>smaczne</li>
              <li>biale</li>
            </ul>
            <p>Minusy</p>
            <ul>
              <li>wypala oczy</li>
              <li>smierdzi jak skarpetki sprintera</li>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  getProduct,
})(withRouter(Product));
