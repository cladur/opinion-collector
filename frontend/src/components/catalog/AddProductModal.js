import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isStaff } from "../../utils/Utils";
import { addProduct } from "../product_api/ProductsActions";
import Modal from "react-bootstrap/Modal";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      ingredients: "",
      image: "",
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
  };

  onAddClick = () => {
    let product = new FormData();
    // const product = {
    //   name: this.state.name,
    //   description: this.state.description,
    //   ingredients: this.state.ingredients,
    //   image: this.state.image,
    // };
    product.append("name", this.state.name);
    product.append("description", this.state.description);
    product.append("ingredients", this.state.ingredients);
    if (this.state.image) {
      product.append("image", this.state.image, this.state.image.name);
    }
    this.props.addProduct(product);
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.showModal}>
          Add Product
        </Button>

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
                <br />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter description"
                  value={this.description}
                  onChange={this.onChange}
                />
                <br />
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="ingredients"
                  placeholder="Enter ingredients"
                  value={this.ingredients}
                  onChange={this.onChange}
                />
                <br />
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  name="image"
                  placeholder="Enter image"
                  value={this.image}
                  onChange={this.onImageChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.onAddClick}>
              Add Product
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

Search.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  addProduct,
})(withRouter(Search));
