"use strict";

import { withRouter, NavLink } from "react-router-dom";
import React, { Component } from "react";

import { UserById } from "./../../../components/Dashboard";

class ProjectView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            project: [],
            projectToken: ""
        };
    }

    componentDidMount() {
        fetch(`/api/Prototype/project/${this.props.match.params.id}`)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({ project: json.project }, () => {
                        this.getToken();
                    });
                }
            });
    }

    createToken(projectId) {
        fetch(`/api/Prototype/project/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectId: projectId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({ projectToken: json.data.token });
                }
            });
    }

    updateToken(projectId) {
        fetch(`/api/Prototype/project/token`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectId: projectId
            })
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.getToken();
                }
            });
    }

    getToken() {
        fetch(`/api/Prototype/project/${this.props.match.params.id}/token`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log(data.data[0].token);
                    this.setState({ projectToken: data.data[0].token });
                }
            });
    }

    render() {
        const { project, projectToken } = this.state;

        return (
            <div className="content">
                <ul>
                    <li>
                        <NavLink exact to="/dashboard">
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
                <hr />
                <div>
                    {project && (
                        <div>
                            <h1>
                                {project.title} ({project._id})
                            </h1>

                            <h3>Project Overview</h3>
                            <ul>
                                <li>creatorId: {project.creatorId}</li>
                                <li>
                                    token:{" "}
                                    {projectToken ? (
                                        <span>
                                            {projectToken}
                                            <button
                                                onClick={this.updateToken.bind(
                                                    this,
                                                    project._id
                                                )}
                                            >
                                                Refresh
                                            </button>
                                        </span>
                                    ) : (
                                        <button
                                            onClick={this.createToken.bind(
                                                this,
                                                project._id
                                            )}
                                        >
                                            createToken
                                        </button>
                                    )}
                                </li>
                            </ul>

                            <h3>Team</h3>
                            <ul>
                                {project.team &&
                                    project.team.map((teamMember, i) => {
                                        return <li key={i}>{teamMember}</li>;
                                    })}
                            </ul>

                            <h3>Players</h3>
                            <div></div>

                            <h3>Notifications</h3>
                            <div></div>

                            <h3>MessageOfTheDay</h3>
                            <div></div>

                            <h3>Characters</h3>
                            <div></div>

                            <h3>Assets</h3>
                            <div></div>

                            <h3>Translations</h3>
                            <div></div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(ProjectView);

//                                 {/* {project.creatorId && (
//                                 <UserById userId={project.creatorId} />
//                             )} */}
