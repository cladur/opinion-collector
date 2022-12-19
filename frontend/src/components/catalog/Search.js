import PropTypes from "prop-types";
import React, { Component } from "react";
import { Card, Container, Form, InputGroup, Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isStaff, isAuthenticated } from "../../utils/Utils";
import { getProducts, addProduct } from "../product_api/ProductsActions";
import { getCategories, updateCategory } from "../category_api/CategoryActions";
import AddProductModal from "./AddProductModal";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search_name: "",
      search_category: "",
    };
  }
  componentDidMount() {
    this.props.getProducts(this.state.search_name, this.state.search_category);
    this.props.getCategories();
  }

  addProductButton() {
    if (isStaff()) {
      return (
        <>
          <AddProductModal />
          &nbsp; &nbsp;
        </>
      );
    }
  }

  addCategoryButton(category) {
    if (isStaff()) {
      return <AddCategoryModal />;
    }
  }

  onSearchNameChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.filterProducts();
    });
  };

  displayRow(products) {
    return products.map((product) => (
      <Col key={product.id}>
        <Card md="true" key={product.id}>
          <Card.Link href={"/products/" + product.id}>
            <Card.Img
              height={"200px"}
              style={
                product.is_active
                  ? { objectFit: "cover" }
                  : { objectFit: "cover", filter: "grayscale(100%)" }
              }
              variant="top"
              src={product.image}
            />
          </Card.Link>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text className="col-40 text-truncate">
              {product.description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  }

  displayProducts() {
    const { products } = this.props.products;

    var result = [];

    for (var i = 0; i < products.length; i += 4) {
      var products_row = products.slice(i, i + 4);
      result.push(
        <Row
          key={i}
          md="4"
          className="mb-4 mt-4"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {this.displayRow(products_row)}
        </Row>
      );
    }

    return result;
  }

  isCategorySelected(category) {
    if (category === this.state.search_category) {
      return "primary";
    }
    return "";
  }

  updateCategoryVisibility(category, is_active) {
    this.props.updateCategory(category.id, { is_active: is_active });
    category.is_active = is_active;
    setTimeout(() => {
      this.forceUpdate();
    }, 100);
  }

  categoryVisibilityButton(category) {
    return (
      <Button
        size="sm"
        style={{ height: "30px" }}
        onClick={(e) => {
          e.stopPropagation();
          this.updateCategoryVisibility(category, !category.is_active);
        }}
        variant={category.is_active ? "danger" : "success"}
      >
        {category.is_active ? "Hide" : "Show"}
      </Button>
    );
  }

  displayCategoryButtons(category) {
    if (!isStaff()) {
      return;
    }
    return (
      <div style={{ marginLeft: "auto" }}>
        <EditCategoryModal category={category} />
        &nbsp;
        {this.categoryVisibilityButton(category)}
      </div>
    );
  }

  displayCategory(category, indent) {
    return (
      <ListGroup
        key={category.id}
        style={{ marginLeft: "20px" }}
        variant="flush"
      >
        <ListGroup.Item
          action
          variant={this.isCategorySelected(category.id)}
          onClick={() => this.setCategoryFilter(category.id)}
        >
          <div style={{ display: "flex" }}>
            {category.name}
            {this.displayCategoryButtons(category)}
          </div>
        </ListGroup.Item>
        {this.displayCategories(category.children, indent + 1)}
      </ListGroup>
    );
  }

  displayCategories(categories) {
    var result = [];

    for (var category of categories) {
      result.push(this.displayCategory(category, 0));
    }

    return result;
  }

  setCategoryFilter = (category) => {
    if (this.state.search_category === category) {
      category = null;
    }
    this.setState({ search_category: category }, () => {
      this.filterProducts();
    });
  };

  filterProducts = () => {
    this.props.getProducts(this.state.search_name, this.state.search_category);
  };

  render() {
    const { categories } = this.props.categories;

    return (
      <Container>
        <br />
        <Row>
          <Col xs={isStaff() ? 3 : 2}>{this.displayCategories(categories)}</Col>
          <Col>
            {this.addProductButton()}
            {this.addCategoryButton()}
            <InputGroup className="mb-3 mt-3">
              <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
              <Form.Control
                placeholder="Type here to search..."
                aria-label="Type here to search..."
                name="search_name"
                value={this.search_name}
                onChange={this.onSearchNameChange}
              />
            </InputGroup>
            {this.displayProducts()}
          </Col>
        </Row>
      </Container>
    );
  }
}

Search.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  categories: state.categories,
});

export default connect(mapStateToProps, {
  getProducts,
  getCategories,
  addProduct,
  updateCategory,
})(withRouter(Search));
