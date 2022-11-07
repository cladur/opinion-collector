import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Root from "./Root";

import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Catalog from "./components/catalog/Catalog";
import Navigation from "./components/Navigation";
import Product from "./components/product/Product";
import Settings from "./components/settings/Settings";

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
            <Route path="/products/:id" component={Product} />
            <Route path="/catalog" component={Catalog} />
            <Route path="/settings" component={Settings} />
            <Route exact path="/" component={Catalog} />
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
