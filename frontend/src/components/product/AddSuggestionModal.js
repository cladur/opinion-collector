import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addSuggestion } from "../suggestion_api/SuggestionActions";
import Modal from "react-bootstrap/Modal";

import Select from "react-dropdown-select";

class AddSuggestionModal extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
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
    const suggestion = {
      is_active: true,
      product: this.props.match.params.id,
      description: this.state.description,
    };

    this.props.addSuggestion(suggestion);

    this.setState({ description: "" });
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.showModal}>
          Add Suggestion
        </Button>

        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Suggestion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="contentId">
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
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.onAddClick}>
              Add Suggestion
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

AddSuggestionModal.propTypes = {
  addSuggestion: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  addSuggestion,
})(withRouter(AddSuggestionModal));
