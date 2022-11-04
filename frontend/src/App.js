import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Root from "./Root";

import requireAuth from "./utils/RequireAuth";

import Home from "./components/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Navigation from "./components/Navigation";

import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000";

class App extends Component {
  render() {
    return (
      <div>
        <Root>
          <Navigation />
          <ToastContainer hideProgressBar={true} newestOnTop={true} />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={requireAuth(Dashboard)} />
            <Route exact path="/" component={Home} />
            <Route path="*">
              <h1 className="text-center">
                The URL you specified is incorrect, it doesn't match with any
                route!
              </h1>
            </Route>
          </Switch>
        </Root>
      </div>
    );
  }
}

export default App;
