"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { Button, Form, Header, Message, Segment } from "semantic-ui-react";

import { setInStorage } from "./../../utils/storage";

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

    handleChange(e, { name, value }) {
        this.setState({ [name]: value });
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
            <Segment basic>
                <Header as="h2" color="black" textAlign="center">
                    Log-in
                </Header>
                <Form size="large">
                    <Segment raised>
                        <Segment vertical>
                            <Form.Input
                                type="email"
                                name="email"
                                fluid
                                icon="user"
                                iconPosition="left"
                                value={email}
                                onChange={this.handleChange.bind(this)}
                                placeholder="E-mail address"
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange.bind(this)}
                            />
                            <Button
                                color="teal"
                                fluid
                                size="large"
                                onClick={this.onLogin.bind(this)}
                            >
                                Login
                            </Button>
                        </Segment>
                        <Message>
                            Dont have an account yet?&nbsp;
                            <NavLink exact to="/register">
                                Create one now!
                            </NavLink>
                        </Message>
                        {loginError ? (
                            <Message color="red">{loginError}</Message>
                        ) : null}
                    </Segment>
                </Form>
            </Segment>
        );
    }
}

export default withRouter(Login);
