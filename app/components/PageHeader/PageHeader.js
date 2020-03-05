"use strict";

import React, { Component } from "react";

import { Menu } from "semantic-ui-react";

import { HeaderMenu } from "./../";

export default class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <HeaderMenu />;
    }
}
