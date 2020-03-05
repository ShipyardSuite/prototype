import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";

import { Home, NotFound, Register, Dashboard, Login } from "./containers";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route component={NotFound} />
            </Switch>
        </App>
    </Router>,
    document.querySelector("#root")
);
