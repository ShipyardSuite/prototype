"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

class ProjectTeamView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: []
        };
    }

    componentDidMount() {
        // fetch(`/api/Prototype/project/${this.props.match.params.id}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.success) {
        //             this.setState({ project: data.project });
        //         }
        //     });
    }

    render() {
        return <div>Test</div>;
    }
}

export default withRouter(ProjectTeamView);
