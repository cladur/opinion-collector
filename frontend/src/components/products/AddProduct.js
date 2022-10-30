import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { addProduct } from "./ProductsActions";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClick = () => {
    const product = {
      name: this.state.name,
      description: this.state.description,
    };
    this.props.addProduct(product);
  };

  render() {
    return (
      <div>
        <h2>Add new product</h2>
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
        <Button variant="success" onClick={this.onAddClick}>
          Add product
        </Button>
      </div>
    );
  }
}

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { addProduct })(withRouter(AddProduct));
