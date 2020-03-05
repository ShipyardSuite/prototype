"use strict";

import { Link, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { Button, Form, Header, Message, Segment } from "semantic-ui-react";

export default class Register extends Component {
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

    handleChange(e, { name, value }) {
        this.setState({ [name]: value });
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
            <Segment basic>
                <Header as="h2" color="black" textAlign="center">
                    Register new Account
                </Header>
                <Form size="large">
                    <Segment raised>
                        <Segment vertical disabled={registrationSuccess}>
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
                        </Segment>
                        {registrationSuccess ? (
                            <Message color="green">
                                Registration Successful, check your
                                emails.&nbsp;
                                <NavLink exact to="/">
                                    Back to Homepage
                                </NavLink>
                            </Message>
                        ) : null}
                        {signUpError ? (
                            <Message color="red">{signUpError}</Message>
                        ) : null}
                    </Segment>
                </Form>
            </Segment>
        );
    }
}
