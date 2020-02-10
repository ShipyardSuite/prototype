"use strict";

import React, { Component } from "react";
import fetch from "isomorphic-unfetch";

import { DBFetcher } from "@shipyardsuite/base-layout";

import HeaderMenu from "../../components/HeaderMenu/HeaderMenu";

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
                <HeaderMenu />
                <DBFetcher url="/api/Prototype/test" />
            </div>
        );
    }
}
