'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Segment, Grid, Header, List, Button } from 'semantic-ui-react';

class ProjectInfoView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			project: [],
			projectToken: ''
		};
	}

	componentDidMount() {
		this.intervalID = setInterval(() => this.getProjectInfo(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	getProjectInfo() {
		const { projectId } = this.props;

		fetch(`/api/Prototype/project/${projectId}`).then((res) => res.json()).then((json) => {
			if (json.success) {
				this.setState({ project: json.project, isLoading: false }, () => {
					this.getToken();
				});
			}
		});
	}

	createToken(projectId) {
		fetch(`/api/Prototype/project/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				projectId: projectId
			})
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.success) {
					this.setState({ projectToken: json.data.token });
				}
			});
	}

	updateToken(projectId) {
		fetch(`/api/Prototype/project/token`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				projectId: projectId
			})
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.success) {
					this.getToken();
				}
			});
	}

	getToken() {
		fetch(`/api/Prototype/project/${this.props.match.params.id}/token`).then((res) => res.json()).then((data) => {
			if (data.success) {
				this.setState({ projectToken: data.data[0].token });
			}
		});
	}

	render() {
		const { isLoading, project, projectToken } = this.state;
		return (
			<div>
				<Header as="h3">Project Overview</Header>
				<Segment basic loading={isLoading}>
					{isLoading === false && (
						<List>
							<List.Item icon="user" header="Creator" content={project.creatorId} />
							{projectToken ? (
								<List.Item icon="lock" header="Token" content={projectToken} />
							) : (
								<List.Item
									icon="lock"
									header="Token"
									content={
										<Button onClick={this.createToken.bind(this, project._id)}>Create Token</Button>
									}
								/>
							)}
							<List.Item>
								<List.Icon name="users" />
								<List.Content>
									<List.Header>Team</List.Header>

									<List.List>
										{project.team &&
											project.team.map((teamMember, i) => {
												return <List.Item key={i}>{teamMember}</List.Item>;
											})}
									</List.List>
								</List.Content>
							</List.Item>
						</List>
					)}
				</Segment>
			</div>
		);
	}
}

export default withRouter(ProjectInfoView);
