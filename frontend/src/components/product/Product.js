import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProduct } from "../product_api/ProductsActions";
import { getOpinions } from "../opinion_api/OpinionActions";
import AddOpinionModal from "./AddOpinionModal";
import Button from "react-bootstrap/Button";
import { isStaff, isAuthenticated } from "../../utils/Utils";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

class Product extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    this.props.getOpinions(this.props.match.params.id);
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

  displayOpinions(opinions) {
    console.log(opinions);

    if (opinions.length === 0) {
      return <p>No opinions have been added to this product yet!</p>;
    }

    return opinions.map((opinion) => (
      <div key={opinion.id}>
        <div>
          <h5 style={{ display: "inline-block" }}>
            {opinion.created_by.username}
          </h5>
          <span style={{ "margin-left": "10px" }}>
            {new Date(opinion.created_at).toLocaleDateString()}
          </span>
        </div>
        <p>{opinion.description}</p>
        <p>Positives</p>
        <ul>
          <li>smaczne</li>
        </ul>
        <p>Negatives</p>
        <ul>
          <li>drogie</li>
        </ul>
      </div>
    ));
  }

  render() {
    const { products } = this.props.products;
    const { opinions } = this.props.opinions;

    const product = products[0];

    if (products.length === 0) {
      return;
    }

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
            {this.displayOpinions(opinions)}
          </Col>
        </Row>
      </Container>
    );
  }
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  getOpinions: PropTypes.func.isRequired,
  opinions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  opinions: state.opinions,
});

export default connect(mapStateToProps, {
  getProduct,
  getOpinions,
})(withRouter(Product));
