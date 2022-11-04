import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProduct } from "../product_api/ProductsActions";

class Product extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { products } = this.props.products;

    if (products.length == 0) {
      return;
    }

    const product = products[0];

    return (
      <div>
        <h2>Product</h2>
        <p>ID: {product.id}</p>
        <p>Name: {product.name}</p>
        <p>Description: {product.description}</p>
      </div>
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
