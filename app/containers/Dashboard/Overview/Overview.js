"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";
import moment from "moment";

import { getFromStorage } from "./../../../utils/storage";

import { DashboardHeader } from "./../../../components/Dashboard";

class Overview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            projects: []
        };
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        const obj = getFromStorage("botany-bay");

        if (obj && obj.token) {
            const { token } = obj;

            fetch("/api/Prototype/user/?id=" + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState(
                            {
                                isLoading: false,
                                user: json.data.user
                            },
                            () => {
                                this.getProjects();
                            }
                        );
                    }
                });
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    getProjects() {
        const { user } = this.state;
        fetch(`/api/Prototype/${user._id}/projects/`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState({ projects: data.projects });
                }
            });
    }

    render() {
        const { user, projects } = this.state;

        return (
            <div className="content">
                <DashboardHeader />
                <div>
                    <h1>Overview</h1>

                    <h3>User</h3>
                    <ul>
                        <li>id: {user._id}</li>
                        <li>
                            signedUp: {moment(user.signUpDate).fromNow(true)}
                            ago
                        </li>
                        <li>
                            lastLogin: {moment(user.lastLogin).fromNow(true)}
                        </li>
                        <li>email: {user.email}</li>
                        <li>verified: {user.isVerified ? "✔" : "✘"}</li>
                    </ul>

                    <h3>Projects</h3>
                    <ul>
                        {projects.map((project, i) => {
                            return (
                                <li key={i}>
                                    <NavLink
                                        to={`/dashboard/project/${project._id}`}
                                    >
                                        {project.title}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(Overview);
