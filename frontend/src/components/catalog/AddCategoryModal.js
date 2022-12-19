import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addCategory } from "../category_api/CategoryActions";
import Modal from "react-bootstrap/Modal";

class AddCategoryModal extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      parent: "",
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });

    var category = this.props.category;
    this.setState({ name: category.name });
    this.setState({ parent: category.parent });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClick = () => {
    var category = {
      is_active: true,
      name: this.state.name,
      parent: this.state.parent,
    };

    this.props.addCategory(category);

    this.setState({ name: "" });
    this.setState({ parent: "" });
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

  listCategoryOptionsWithNull(categories) {
    var result = [];
    result.push(this.categoryOption({ id: null, name: "null" }));
    result.push(this.listCategoryOptions(categories));
    return result;
  }

  render() {
    const { categories } = this.props.categories;

    return (
      <>
        <Button variant="primary" onClick={this.showModal}>
          Add Category
        </Button>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
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
                <Form.Label>Parent</Form.Label>
                <Form.Select
                  name="parent"
                  aria-label="Select parent"
                  value={this.state.parent}
                  onChange={this.onChange}
                >
                  {this.listCategoryOptionsWithNull(categories)}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.onAddClick}>
              Add Category
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

AddCategoryModal.propTypes = {
  addCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, {
  addCategory,
})(withRouter(AddCategoryModal));
