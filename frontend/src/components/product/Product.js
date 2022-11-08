import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getProduct } from "../product_api/ProductsActions";
import OpinionWindow from "../opinion/Opinion";
import Button from "react-bootstrap/Button";
import "./Product.css"
import testImage from "./testProductImage.jpeg"

class Product extends Component {
  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }
  
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { products } = this.props.products;

    if (products.length == 0) {
      return;
    }

    const product = products[0];
	if (this.isAuthenticated())
	{
		return (
		<div className="mainDiv">
			<h1>{product.name}</h1>
			<div className="lrContainer">
				<div className="leftDiv">
					<testImage/>
					<img src={testImage} width="200px" height="200px" alt="tu zdjecie"></img>
				</div>
				<div className="rightDiv">
					<h2>Description</h2>
					<p>{product.description}</p>
					<h2>Ingrediens</h2>
					<p>Jakis kwas i mąka</p>
					<Button variant="primary">Suggestion?</Button>
				</div>
			</div>
			<h2>Opinions <OpinionWindow /></h2> 
			<div className="opinion">
				<p>TestUserName</p>
				<p>Test opinion on this product</p>
				<p>Plusy</p>
				<ul>
					<li>smaczne</li>
					<li>biale</li>
				</ul>
				<p>Minusy</p>
				<ul>
					<li>wypala oczy</li>
					<li>smierdzi jak skarpetki sprintera</li>
				</ul>
			</div>
		</div>
		);
	}
	return (
	<div className="mainDiv">
		<h1>{product.name}</h1>
		<div className="lrContainer">
			<div className="leftDiv">
				<testImage/>
				<img src={testImage} width="200px" height="200px" alt="tu zdjecie"></img>
			</div>
			<div className="rightDiv">
				<h2>Description</h2>
				<p>{product.description}</p>
				<h2>Ingrediens</h2>
				<p>Jakis kwas i mąka</p>
				<Button variant="primary">Suggestion?</Button>
			</div>
		</div>
		<h2>Opinions</h2> 
		<div className="opinion">
			<p>TestUserName</p>
			<p>Test opinion on this product</p>
			<p>Plusy</p>
			<ul>
				<li>smaczne</li>
				<li>biale</li>
			</ul>
			<p>Minusy</p>
			<ul>
				<li>wypala oczy</li>
				<li>smierdzi jak skarpetki sprintera</li>
			</ul>
		</div>
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
