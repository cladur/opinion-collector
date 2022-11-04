import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProducts } from "../product_api/ProductsActions";

class ProductsList extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  listProducts(products) {
    return products.map((product) => {
      return (
        <div key={product.id}>
          <a href={"/products/" + product.id}>{product.name}</a>
          <p>{product.description}</p>
        </div>
      );
    });
  }

  render() {
    const { products } = this.props.products;

    if (products.length === 0) {
      return <h2>There are no products!</h2>;
    }

    return (
      <div>
        <h2>Products</h2>
        {this.listProducts(products)}
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
