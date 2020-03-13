import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App";

import { Home, NotFound, Login, Register } from "./containers/Page";
import { Overview, ProjectView } from "./containers/Dashboard";

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/dashboard" component={Overview} />
                <Route
                    exact
                    path="/dashboard/project/:id"
                    component={ProjectView}
                />
                <Route component={NotFound} />
            </Switch>
        </App>
    </Router>,
    document.querySelector("#root")
);
