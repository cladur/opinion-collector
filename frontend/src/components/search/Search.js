import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isStaff } from "../../utils/Utils";
import defaultImage from "../../assets/img/default.svg";
import { getProducts, addProduct } from "../product_api/ProductsActions";
import Modal from "react-bootstrap/Modal";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      name: "",
      description: "",
    };
  }

  addProduct() {
    if (isStaff()) {
      return (
        <Button
          variant="outline-secondary"
          id="button-addon2"
          onClick={this.showModal}
        >
          Add Product
        </Button>
      );
    }
  }

  componentDidMount() {
    this.props.getProducts();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onAddClick = () => {
    const product = {
      name: this.state.name,
      description: this.state.description,
    };
    this.props.addProduct(product);
    this.hideModal();
  };

  render() {
    const { products } = this.props.products;

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
          {this.addProduct()}
        </InputGroup>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {products.map((product) => (
            <Card style={{ width: "18rem", margin: "1rem" }} key={product.id}>
              <Card.Link href={"/products/" + product.id}>
                <Card.Img variant="top" src={defaultImage} />
              </Card.Link>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>{product.ingredients}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="contentId">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  name="name"
                  placeholder="Enter name"
                  value={this.name}
                  onChange={this.onChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter description"
                  value={this.description}
                  onChange={this.onChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onAddClick}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

Search.propTypes = {
  getProducts: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  getProducts,
  addProduct,
})(withRouter(Search));
