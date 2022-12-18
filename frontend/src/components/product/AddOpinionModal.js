import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addOpinion } from "../opinion_api/OpinionActions";
import Modal from "react-bootstrap/Modal";

import Select from "react-dropdown-select";

import { positives, negatives } from "./tags";

class AddOpinionModal extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      positives: [],
      negatives: [],
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClick = () => {
    let opinion = new FormData();
    opinion.append("score", this.state.score);
    opinion.append("description", this.state.description);
    opinion.append("product", this.props.match.params.id);
    this.props.addOpinion(opinion);

    this.setState({ score: "" });
    this.setState({ description: "" });
    this.setState({ positives: [] });
    this.setState({ negatives: [] });
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
    return (
      <>
        <Button variant="primary" onClick={this.showModal}>
          Add Opinion
        </Button>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Opinion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="contentId">
                <Form.Label>Score</Form.Label>
                <Form.Select
                  aria-label="Score"
                  name="score"
                  placeholder="Enter score"
                  value={this.categories}
                  onChange={this.onChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
                <br />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter description"
                  value={this.description}
                  onChange={this.onChange}
                />
                <br />
                <Form.Label>Positives</Form.Label>
                <Select
                  multi
                  options={positives}
                  values={this.positives}
                  labelField="name"
                  valueField="id"
                  searchBy="name"
                  name="positives"
                  // value={this.positives}
                  onChange={(value) => this.setState({ positives: value })}
                />
                <br />
                <Form.Label>Negatives</Form.Label>
                <Select
                  multi
                  options={negatives}
                  values={this.state.negatives}
                  labelField="name"
                  valueField="id"
                  searchBy="name"
                  onChange={(value) => this.setState({ negatives: value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.onAddClick}>
              Add Opinion
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

AddOpinionModal.propTypes = {
  addOpinion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, {
  addOpinion,
})(withRouter(AddOpinionModal));
