import React from "react";

import "./styles.css";

  var database = [ // Temporary database
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = { // Error messages
    uname: "invalid username",
    pass: "invalid password",
    unameTaken: "username already taken",
    passMatch: "passwords do not match"
  };

class MainPage extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      isLoginPage: false, // If true, show login page
      isRegsiterPage: false // If true, show register page
    }
    this.RefreshPage = this.RefreshPage.bind(this);
  }

  setLoginPage(x){ // Set login page state
    this.setState({
      isLoginPage: x
    })
  }

  setRegisterPage(x){ // Set register page state
    this.setState({
      isRegisterPage: x
    })
  }

  RefreshPage() { // Set all page states to false so it shows the selection form
    this.setState({
      isLoginPage: false,
      isRegisterPage: false
    })
  }

  render() { // Render the page based on the states
    if (this.state.isLoginPage) {
      return (
        <LoginPage 
          refresh = {this.RefreshPage}
        />
      )
    }
    else if (this.state.isRegisterPage) {
      return (
        <RegisterPage 
          refresh = {this.RefreshPage}
        />
      )
    }
    else {
      return (
        <SelectionForm // Selection form to choose between login and register
          onClickLogin = {() => this.setLoginPage(true)}
          onClickRegister = {() => this.setRegisterPage(true)}
        />
      )
    }
  }
}
class SelectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      onClickLogin: props.onClickLogin,
      onClickRegister: props.onClickRegister
    }
  }
  
  render() { // Render the selection form with the buttons to choose between login and register
    return (
      <div className="selection">
        <form>
          <div className="buttons">
            <div className="input-container">
              <input id="login" type="button" value="Login" onClick = {this.state.onClickLogin}/>
            </div>
            <div className="input-container">
              <input id="register" type="button" value="Register" onClick = {this.state.onClickRegister}/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
class LoginPage extends React.Component {
  constructor(props) { // Initialize the state of the login page and bind the functions
    super(props);
    this.state = {
      uname: "", // Username
      pass: "", // Password
      errorMessages: {}, // Error messages
      isSubmitted: false, // If true, show success page
      refresh: props.refresh // Function to refresh the page
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
  }
  render() {
    if (!this.state.isSubmitted) { // If the form is not submitted, show the login form
      return (
        <div className="form">
          <form onSubmit={this.handleSubmit}>
            <div className="input-container">
              <label>Username </label>
              <input type="text" name="uname" required />
              {this.renderErrorMessage("uname")}
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="pass" required />
              {this.renderErrorMessage("pass")}
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
          </form>
        </div>
        );
    }
    else { // If the form is submitted, show the success page
      return (
      <Success
        type = "login"
        username = {this.state.uname}
        refresh = {this.state.refresh}
      />
      );
    }
    
  }
  handleSubmit = (event) => { // Handle the form submission and check for errors in the form
  //Prevent page reload
  event.preventDefault();
  // Get the form data
  var { uname, pass } = document.forms[0];
  // Find user login info
  const userData = database.find((user) => user.username === uname.value);
  // Compare user info
  if (userData) {
    // If username is correct, check password
    if (userData.password !== pass.value) {
      // Invalid password
      this.setState({errorMessages: { name: "pass", message: errors.pass }});
    } else {
      // Valid login
      this.setState({isSubmitted: true, uname: uname.value});
    }
  } else {
    // Username not found
    this.setState({errorMessages: { name: "uname", message: errors.uname }});
  }
  };

  // Generate JSX code for error message
  renderErrorMessage = (name) =>
    name === this.state.errorMessages.name && (
      <div className="error">{this.state.errorMessages.message}</div>
      );
}
class RegisterPage extends React.Component {
  constructor(props) { // Initialize the state of the register page and bind the functions
    super(props);
    this.state = {
      uname: "",
      pass: "",
      errorMessages: {},
      isSubmitted: false,
      refresh: props.refresh
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrorMessage = this.renderErrorMessage.bind(this);
  }

  handleSubmit = (event) => { // Handle the form submission and check for errors in the form
    //Prevent page reload
    event.preventDefault();
  
    var { uname, pass, passConfirm } = document.forms[0];
    console.log(uname.value);
    console.log(pass.value);
    console.log(passConfirm.value);
  
    // Find user login info
    const userData = database.find((user) => user.username === uname.value);
    console.log(database);

    if (userData) { 
      // Username already exists error message 
      this.setState({errorMessages: { name: "unameTaken", message: errors.unameTaken }});
    } 
    else { // If not we can register the user
      // Check if passwords match
      if (pass.value === passConfirm.value) { 
        // Add user to database and set the state to show the success page 
        database.push({username: uname.value, password: pass.value});
        this.setState({isSubmitted: true, uname: uname.value});
        console.log("WTF");
      }
      else {
        // Passwords don't match error message
        this.setState({errorMessages: { name: "passMatch", message: errors.passMatch }});
      }
    }
    };

  render() {
    if (!this.state.isSubmitted) // If the form is not submitted, show the register form
    {
    return (
    <div className="form">
      <form onSubmit={this.handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {this.renderErrorMessage("unameTaken")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {this.renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Password confirmation</label>
          <input type="password" name="passConfirm" required />
          {this.renderErrorMessage("passMatch")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
    );
    }
    else { // If the form is submitted, show the success page
      return (
      <Success
        type = "register"
        username = {this.state.uname}
        refresh = {this.state.refresh}
      />
      );
    }
  }

  // Generate JSX code for error message
  renderErrorMessage = (name) =>
    name === this.state.errorMessages.name && (
      <div className="error">{this.state.errorMessages.message}</div>
      );
}
function Success(props) {
  if (props.type === "login") { // If the user logged in, show the login success page
  return (
    <div className="success">
          <label>Successfully logged in as {props.username}</label>
        <div className="button-container">
          <input type="button" value="Back" onClick = {props.refresh}/>
        </div>
    </div>
  );
  }
  else { // If the user registered, show the register success page
    return (
      <div className="success">
          <label>Successfully registered as {props.username}</label>
        <div className="button-container">
          <input type="button" value="Back" onClick = {props.refresh}/>
        </div>
      </div>
    );
  }
}
export default MainPage; 