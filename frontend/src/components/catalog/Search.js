import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isStaff } from "../../utils/Utils";
import { getProducts, addProduct } from "../product_api/ProductsActions";
import AddProductModal from "./AddProductModal";

class Search extends Component {
  constructor() {
    super();
  }

  addProductButton() {
    if (isStaff()) {
      return <AddProductModal />;
    }
  }

  componentDidMount() {
    this.props.getProducts();
  }

  displayProducts() {
    const { products } = this.props.products;

    return products.map((product) => (
      <Card style={{ width: "18rem", margin: "1rem" }} key={product.id}>
        <Card.Link href={"/products/" + product.id}>
          <Card.Img
            height={"200px"}
            style={{ objectFit: "cover" }}
            variant="top"
            src={product.image}
          />
        </Card.Link>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
      </Card>
    ));
  }

  render() {
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
          {this.addProductButton()}
        </InputGroup>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.displayProducts()}
        </div>
        {/* {this.state.addProductModal ? <AddProductModal /> : null} */}
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
