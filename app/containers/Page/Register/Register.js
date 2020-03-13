"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signUpError: "",
            registrationSuccess: false,
            email: "",
            password: "",
            passwordValidation: ""
        };
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSignUp() {
        const { email, password, passwordValidation } = this.state;

        if (password === passwordValidation) {
            fetch("/api/Prototype/user/register", {
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
                        this.setState({
                            signUpError: json.message,
                            registrationSuccess: true,
                            email: "",
                            password: ""
                        });
                    } else {
                        this.setState({
                            signUpError: json.message
                        });
                    }
                });
        } else {
            this.setState({
                signUpError: "Passwords did not match!"
            });
        }
    }

    render() {
        const {
            email,
            password,
            passwordValidation,
            registrationSuccess,
            signUpError
        } = this.state;

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
                    <h1>Register</h1>

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
                        <input
                            placeholder="Repeat Password"
                            type="password"
                            name="passwordValidation"
                            value={passwordValidation}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <br />
                        <button onClick={this.onSignUp.bind(this)}>
                            Register
                        </button>
                    </div>

                    {registrationSuccess ? (
                        <p>
                            Registration Successful, check your emails.&nbsp;
                            <NavLink exact to="/">
                                Back to Homepage
                            </NavLink>
                        </p>
                    ) : null}
                    {signUpError ? <p>{signUpError}</p> : null}
                </div>
            </div>
        );
    }
}

export default withRouter(Register);

/*
<Form.Input
                                fluid
                                type="email"
                                icon="user"
                                iconPosition="left"
                                placeholder="E-mail address"
                                name="email"
                                value={email}
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                fluid
                                type="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={this.handleChange.bind(this)}
                            />
                            <Form.Input
                                fluid
                                type="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Repeat Password"
                                name="passwordValidation"
                                value={passwordValidation}
                                onChange={this.handleChange.bind(this)}
                            />
                            <Button
                                color="teal"
                                fluid
                                size="large"
                                onClick={this.onSignUp.bind(this)}
                            >
                                Register
                            </Button>
*/
