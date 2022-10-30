import React, { Component } from "react";
import PropTypes from "prop-types";

class Product extends Component {
  render() {
    const { product } = this.props;
    return (
      <div>
        <h4>{product.name}</h4>
        <p>{product.description}</p>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
};
export default Product;
