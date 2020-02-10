"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { Menu } from "semantic-ui-react";

import { getFromStorage } from "./../../utils/storage";

class HeaderMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeItem: "home",
            isLoading: true,
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
                            isLoggedIn: true,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false,
                            isLoggedIn: false,
                            userData: []
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    handleClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    handleLogout() {
        this.setState({
            isLoading: true
        });

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
                                token: "",
                                signInError: "",
                                isLoading: false
                            },
                            () => {
                                return this.props.history.push("/");
                            }
                        );
                    } else {
                        this.setState({
                            isLoading: false
                        });
                    }
                });
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    render() {
        const { activeItem, isLoggedIn } = this.state;

        return (
            <Menu secondary stackable>
                <Menu.Item header>Shipyard</Menu.Item>
                <Menu.Item
                    name="home"
                    active={activeItem === "home"}
                    onClick={this.handleClick.bind(this)}
                >
                    Home
                </Menu.Item>
                {isLoggedIn ? (
                    <Menu.Menu position="right">
                        <Menu.Item
                            name="logout"
                            active={activeItem === "logout"}
                            onClick={this.handleLogout.bind(this)}
                        >
                            Logout
                        </Menu.Item>
                    </Menu.Menu>
                ) : (
                    <Menu.Menu position="right">
                        <Menu.Item
                            name="login"
                            active={activeItem === "login"}
                            onClick={this.handleClick.bind(this)}
                            as={NavLink}
                            exact
                            to="/login"
                        >
                            Login
                        </Menu.Item>
                        <Menu.Item
                            name="register"
                            active={activeItem === "register"}
                            onClick={this.handleClick.bind(this)}
                            as={NavLink}
                            exact
                            to="/register"
                        >
                            Register
                        </Menu.Item>
                    </Menu.Menu>
                )}
            </Menu>
        );
    }
}

export default withRouter(HeaderMenu);
