import React, { Component } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import {
  getSuggestions,
  updateSuggestion,
} from "../suggestion_api/SuggestionActions";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Container } from "react-bootstrap";

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.getSuggestions();
  }

  resolveSuggestion(suggestion) {
    this.props.updateSuggestion(suggestion.id, { is_active: false });
    setTimeout(() => {
      this.props.getSuggestions();
    }, 100);
  }

  displaySuggestions(suggestions) {
    if (suggestions) {
      return suggestions.map((suggestion) => {
        return (
          <div>
            <Card key={suggestion.id}>
              <Card.Body>
                <Card.Link href={"/products/" + suggestion.product}>
                  <Card.Title>{suggestion.product_name}</Card.Title>
                </Card.Link>
                <Card.Subtitle>
                  by {suggestion.username} on{" "}
                  {new Date(suggestion.created_at).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>{suggestion.description}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => {
                    this.resolveSuggestion(suggestion);
                  }}
                >
                  Resolve
                </Button>
              </Card.Body>
            </Card>
            <br />
          </div>
        );
      });
    } else {
      return <h4>No suggestions</h4>;
    }
  }

  render() {
    const { suggestions } = this.props.suggestions;
    console.log(suggestions);
    return (
      <Container>
        <Row>
          <Col md="8" className="mx-auto">
            <br />
            <h1 style={{ display: "flex", justifyContent: "center" }}>
              Suggestions
            </h1>
            <br />
          </Col>
          {this.displaySuggestions(suggestions)}
        </Row>
      </Container>
    );
  }
}

AdminDashboard.propTypes = {
  getSuggestions: PropTypes.func.isRequired,
  updateSuggestion: PropTypes.func.isRequired,
  suggestions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  suggestions: state.suggestions,
});

export default connect(mapStateToProps, {
  getSuggestions,
  updateSuggestion,
})(withRouter(AdminDashboard));
