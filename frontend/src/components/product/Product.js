import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProduct } from "../product_api/ProductsActions";
import { getOpinions } from "../opinion_api/OpinionActions";
import { getFeatures } from "../feature_api/FeatureActions";
import AddOpinionModal from "./AddOpinionModal";
import Button from "react-bootstrap/Button";
import { isStaff, isAuthenticated } from "../../utils/Utils";
import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

class Product extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
    this.props.getOpinions(this.props.match.params.id);
    this.props.getFeatures();
    this.updateFeatures(this.props.match.params.id);
  }

  updateFeatures(id) {
    axios.get("/api/products/" + id + "/").then((response) => {
      this.props.getFeatures(response.data.category);
    });
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

  displayFeatures(positive_features, negative_features, features) {
    if (positive_features.length === 0 && negative_features.length === 0) {
      return <p />;
    }

    const positive_features_list = positive_features.map((id) => (
      <ListGroup.Item key={id} variant="success">
        {features.find((x) => x.id === id).name}
      </ListGroup.Item>
    ));

    const negative_features_list = negative_features.map((id) => (
      <ListGroup.Item key={id} variant="danger">
        {features.find((x) => x.id === id).name}
      </ListGroup.Item>
    ));

    return (
      <div>
        Features
        <ListGroup>
          {positive_features_list}
          {negative_features_list}
        </ListGroup>
      </div>
    );
  }

  displayOpinions(opinions, features) {
    if (opinions.length === 0) {
      return <p>No opinions have been added to this product yet!</p>;
    }

    return opinions.map((opinion) => (
      <div>
        <Card key={opinion.id}>
          <Card.Body>
            <Card.Title>{opinion.rating}/5</Card.Title>
            <Card.Subtitle>
              by {opinion.username} on{" "}
              {new Date(opinion.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <br />
            <Card.Text>{opinion.description}</Card.Text>
            <Card.Text>
              {this.displayFeatures(
                opinion.positive_features,
                opinion.negative_features,
                features
              )}
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
      </div>
    ));
  }

  render() {
    const { products } = this.props.products;
    const { opinions } = this.props.opinions;
    const { features } = this.props.features;

    const product = products[0];

    console.log(opinions);

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
                {product.description}
                <Row className="mt-5"></Row>
                <h2>Ingredients</h2>
                {product.ingredients}
                <br />
                {this.addSuggestionButton()}
              </Col>
              <Col>
                <Image src={product.image} fluid="true" />
              </Col>
            </Row>
            <Row className="mt-5"></Row>
            <h2>Opinions {this.addOpinionButton()}</h2>
            {this.displayOpinions(opinions, features)}
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
  getFeatures: PropTypes.func.isRequired,
  features: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  opinions: state.opinions,
  features: state.features,
});

export default connect(mapStateToProps, {
  getProduct,
  getOpinions,
  getFeatures,
})(withRouter(Product));
