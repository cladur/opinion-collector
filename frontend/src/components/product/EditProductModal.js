import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateProduct } from "../product_api/ProductsActions";
import Modal from "react-bootstrap/Modal";

class EditProductModal extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      ingredients: "",
      category: "",
      image: "",
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
    const { products } = this.props.products;
    var product = products[0];
    this.setState({ name: product.name });
    this.setState({ description: product.description });
    this.setState({ ingredients: product.ingredients });
    this.setState({ category: product.category });
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

  onEditClick = () => {
    let product = new FormData();
    product.append("id", this.props.match.params.id);
    product.append("name", this.state.name);
    product.append("description", this.state.description);
    product.append("ingredients", this.state.ingredients);
    product.append("category", this.state.category);
    if (this.state.image) {
      product.append("image", this.state.image, this.state.image.name);
    }
    this.props.updateProduct(this.props.match.params.id, product);

    this.setState({ show: false });
  };

  categoryOption(category) {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  }

  listCategoryOptions(categories) {
    var result = [];

    for (var category of categories) {
      result.push(this.categoryOption(category));
      var children = this.listCategoryOptions(category.children);
      for (var child of children) {
        result.push(child);
      }
    }

    return result;
  }

  render() {
    const { categories } = this.props.categories;

    return (
      <>
        <Button variant="primary" onClick={this.showModal}>
          Edit Product
        </Button>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
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
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <br />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
                <br />
                <Form.Label>Ingredients</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="ingredients"
                  placeholder="Enter ingredients"
                  value={this.state.ingredients}
                  onChange={this.onChange}
                />
                <br />
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  aria-label="Select category"
                  value={this.state.category}
                  onChange={this.onChange}
                >
                  {this.listCategoryOptions(categories)}
                </Form.Select>
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
            <Button variant="primary" onClick={this.onEditClick}>
              Edit Product
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

EditProductModal.propTypes = {
  updateProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  categories: state.categories,
});

export default connect(mapStateToProps, {
  updateProduct,
})(withRouter(EditProductModal));
