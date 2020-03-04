"use strict";

import React, { Component } from "react";
import fetch from "isomorphic-unfetch";

import { PageHeader } from "../../components";

export default class Home extends Component {
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
            </div>
        );
    }
}
