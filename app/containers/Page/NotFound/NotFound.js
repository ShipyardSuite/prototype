"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

class NotFound extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        fetch("/api/Prototype/users")
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    }

    render() {
        return (
            <div>
                <div>
                    <h1>404</h1>
                    <p>Page not found...</p>

                    <NavLink exact to="/">
                        Home
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default withRouter(NotFound);
