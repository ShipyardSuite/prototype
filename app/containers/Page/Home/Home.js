"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <NavLink exact to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact to="/register">
                            Register
                        </NavLink>
                    </li>
                </ul>
                <hr />
                <div>
                    <h1>Homepage</h1>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
