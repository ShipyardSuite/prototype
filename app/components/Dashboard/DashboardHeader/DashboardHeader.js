"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { getFromStorage } from "./../../../utils/storage";

class DashboardHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            token: ""
        };
    }

    componentDidMount() {
        const obj = getFromStorage("botany-bay");

        if (obj && obj.token !== "") {
        } else {
            this.setState({ isLoggedIn: false });
            return this.props.history.push("/login");
        }

        if (obj && obj.token) {
            const { token } = obj;

            // Verify token
            fetch("/api/Prototype/user/verify?token=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token,
                            isLoggedIn: true
                        });
                    } else {
                        this.setState({
                            isLoggedIn: false
                        });
                    }
                });
        }
    }

    handleLogOut() {
        const obj = getFromStorage("botany-bay");

        if (obj && obj.token) {
            const { token } = obj;

            // Verify token
            fetch("/api/Prototype/user/logout?token=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        localStorage.removeItem("botany-bay");

                        this.setState(
                            {
                                token: ""
                            },
                            () => {
                                return this.props.history.push("/");
                            }
                        );
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <ul>
                    <li>
                        <a href="#" onClick={this.handleLogOut.bind(this)}>
                            Logout
                        </a>
                    </li>
                </ul>
                <hr />
            </div>
        );
    }
}

export default withRouter(DashboardHeader);
