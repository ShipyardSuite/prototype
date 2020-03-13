"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { setInStorage } from "./../../../utils/storage";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: "",
            loginError: "",
            email: "",
            password: ""
        };
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onLogin() {
        const { email, password } = this.state;

        this.setState(
            {
                loginError: ""
            },
            () => {
                fetch("/api/Prototype/user/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                    .then(res => res.json())
                    .then(json => {
                        if (json.success) {
                            setInStorage("botany-bay", { token: json.token });

                            this.props.history.push("/dashboard");

                            this.setState({
                                loginError: json.message,
                                email: "",
                                password: "",
                                token: json.token
                            });
                        } else {
                            this.setState({
                                loginError: json.message
                            });
                        }
                    });
            }
        );
    }

    render() {
        const { email, password, loginError } = this.state;

        return (
            <div>
                <ul>
                    <li>
                        <NavLink exact to="/">
                            Home
                        </NavLink>
                    </li>
                </ul>
                <hr />
                <div>
                    <h1>Log-In</h1>

                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleInputChange.bind(this)}
                            placeholder="E-mail address"
                        />
                        <br />
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <br />
                        <button onClick={this.onLogin.bind(this)}>Login</button>
                    </div>

                    {loginError ? <p>{loginError}</p> : null}
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
