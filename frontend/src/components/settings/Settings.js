import React, { Component } from "react";
import { withRouter } from "react-router-dom"; // new import
import { connect } from "react-redux"; // new import
import PropTypes from "prop-types"; // new import
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form } from "react-bootstrap";

import { setPassword } from "./SettingsActions"

class Settings extends Component {
    constructor(props) {
      super(props);
      this.state = {
        oldPassword: "",
        newPassword: "",
      };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onPasswordChangeClick = () => {
    const userData = {
        newPassword: this.state.newPassword,
        oldPassword: this.state.oldPassword,
    };

    this.props.changePassword(userData, "/catalog"); // <--- login request
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col md="4" className="mx-auto">
                        <h1>Settings</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="oldPasswordId">
                                <Form.Label>Old password</Form.Label>
                                <Form.Control type="password" name="oldPassword" placeholder="Enter old password" value={this.state.oldPassword} onChange={this.onChange} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="newPasswordId">
                                <Form.Label>New password</Form.Label>
                                <Form.Control type="password" name="newPassword" placeholder="Enter new password" value={this.state.newPassword} onChange={this.onChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.onPasswordChangeClick}>
                                Save
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
      }
}

// connect action and store and component
Settings.propTypes = {
    setPassword: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
  });

  export default connect(mapStateToProps, {
    setPassword,
  })(withRouter(Settings));
