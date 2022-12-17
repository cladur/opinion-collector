import React, { Component } from "react";
import { withRouter } from "react-router-dom"; // new import
import { connect } from "react-redux"; // new import
import PropTypes from "prop-types"; // new import
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";

import { setPassword } from "./SettingsActions"; // new import

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_password: "",
      new_password: "",
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // update function to call the action
  onSetPasswordClick = () => {
    const userData = {
      current_password: this.state.current_password,
      new_password: this.state.new_password,
    };

    this.props.setPassword(userData); // <-- signup new user request
  };

  render() {
    return (
      <Container>
        <Row>
          <Col md="4" className="mx-auto">
            <h1>Settings</h1>
            <Form>
              <Form.Group className="mb-3" controlId="usernameId">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  isInvalid={this.props.passwordSet.current_password}
                  type="password"
                  name="current_password"
                  placeholder="Enter old password"
                  value={this.state.current_password}
                  onChange={this.onChange}
                />
                <FormControl.Feedback type="invalid">
                  {this.props.passwordSet.current_password}
                </FormControl.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="passwordId">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  isInvalid={this.props.passwordSet.new_password}
                  type="password"
                  name="new_password"
                  placeholder="Enter new password"
                  value={this.new_password}
                  onChange={this.onChange}
                />
                <Form.Control.Feedback type="invalid">
                  {this.props.passwordSet.new_password}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
            <Button color="primary" onClick={this.onSetPasswordClick}>
              Set Password
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

Settings.propTypes = {
  setPassword: PropTypes.func.isRequired,
  passwordSet: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  passwordSet: state.passwordSet,
});

export default connect(mapStateToProps, {
  setPassword,
})(withRouter(Settings));
