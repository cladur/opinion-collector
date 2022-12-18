import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addOpinion } from "../opinion_api/OpinionActions";
import Modal from "react-bootstrap/Modal";

import Select from "react-dropdown-select";

class AddOpinionModal extends Component {
  constructor() {
    super();
    this.state = {
      score: 1,
      description: "",
      positive_features: [],
      negative_features: [],
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
    var pos_feat = this.state.positive_features.map((x) => x.id);
    var neg_feat = this.state.negative_features.map((x) => x.id);

    const opinion = {
      rating: this.state.score,
      description: this.state.description,
      product: this.props.match.params.id,
      positive_features: pos_feat,
      negative_features: neg_feat,
    };

    console.log(opinion);

    this.props.addOpinion(opinion);

    this.setState({ score: 1 });
    this.setState({ description: "" });
    this.setState({ positive_features: [] });
    this.setState({ negative_features: [] });
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
    var { features } = this.props.features;
    var positive_features = features.filter((x) => x.is_positive);
    var negative_features = features.filter((x) => !x.is_positive);

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
                  value={this.score}
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
                  options={positive_features}
                  values={this.positive_features}
                  labelField="name"
                  valueField="id"
                  searchBy="name"
                  name="positive_features"
                  onChange={(value) =>
                    this.setState({ positive_features: value })
                  }
                />
                <br />
                <Form.Label>Negatives</Form.Label>
                <Select
                  multi
                  options={negative_features}
                  values={this.negative_features}
                  labelField="name"
                  valueField="id"
                  searchBy="name"
                  onChange={(value) =>
                    this.setState({ negative_features: value })
                  }
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
  features: state.features,
});

export default connect(mapStateToProps, {
  addOpinion,
})(withRouter(AddOpinionModal));
