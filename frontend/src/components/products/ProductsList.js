import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProducts } from "./ProductsActions";

import Product from "./Product";

class ProductsList extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products } = this.props.products;

    if (products.length === 0) {
      return <h2>Please add your first product</h2>;
    }

    let items = products.map((product) => {
      return <Product key={product.id} product={product} />;
    });

    return (
      <div>
        <h2>Products</h2>
        {items}
      </div>
    );
  }
}

ProductsList.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  getProducts,
})(withRouter(ProductsList));
