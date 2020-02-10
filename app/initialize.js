import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";

import Home from "./containers/Home/Home";
import NotFound from "./containers/NotFound/NotFound";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </App>
    </Router>,
    document.querySelector("#root")
);
