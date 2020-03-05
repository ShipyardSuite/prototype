"use strict";

import React, { Component } from "react";

import { PageHeader } from "../../components";

export default class NotFound extends Component {
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
                <PageHeader />
                <p>404: Page not found...</p>
            </div>
        );
    }
}
