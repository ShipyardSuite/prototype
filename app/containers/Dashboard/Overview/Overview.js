'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import moment from 'moment';

import { Container, Menu, Message, Segment, List, Grid, Input, Header, Button } from 'semantic-ui-react';

import { getFromStorage } from './../../../utils/storage';

import { DashboardHeader } from './../../../components/Dashboard';

class Overview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			user: {},
			projects: [],
			newProjectName: ''
		};
	}

	componentDidMount() {
		this.getUser();
	}

	getUser() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			fetch('/api/Prototype/user/?id=' + token).then((res) => res.json()).then((json) => {
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
		fetch(`/api/Prototype/${user._id}/projects/`).then((res) => res.json()).then((data) => {
			if (data.success) {
				this.setState({ projects: data.projects });
			}
		});
	}

	createProject() {
		const { user, newProjectName } = this.state;
		fetch(`/api/Prototype/project/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				creator: user._id,
				title: newProjectName
			})
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.success) {
					this.getProjects();
				}
			});
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const { isLoading, user, projects, newProjectName } = this.state;

		return (
			<Container className="content">
				<DashboardHeader />
				<Segment basic loading={isLoading}>
					<Header as="h2">
						{user.email}
						<Header.Subheader>({user._id})</Header.Subheader>
					</Header>

					<Header as="h3">User Informations</Header>
					<List>
						<List.Item icon="hashtag" header="ID" content={user._id} />
						<List.Item
							icon="calendar check outline"
							header="Signed Up"
							content={`${moment(user.signUpDate).fromNow(true)} ago`}
						/>
						<List.Item
							icon="calendar alternate outline"
							header="Last Login"
							content={`${moment(user.lastLogin).fromNow(true)} ago`}
						/>
						<List.Item icon="mail" header="E-Mail" content={user.email} />
					</List>

					<h3>Projects</h3>

					{projects.length > 0 ? (
						<Grid>
							{projects.map((project, i) => {
								return (
									<Grid.Column mobile={16} tablet={16} computer={8} key={i}>
										<Segment>
											<Header as={NavLink} to={`/dashboard/project/${project._id}`}>
												{project.title}
												<Header.Subheader>({project._id})</Header.Subheader>
											</Header>
										</Segment>
									</Grid.Column>
								);
							})}
						</Grid>
					) : (
						<Message icon="info" info content="No Messages yet." />
					)}

					<h3>Create New Project</h3>
					<div>
						<Input
							type="text"
							name="newProjectName"
							value={newProjectName}
							onChange={this.handleInputChange.bind(this)}
							placeholder="Project name..."
							action
						>
							<input />
							<Button onClick={this.createProject.bind(this)}>Create Project</Button>
						</Input>
					</div>
				</Segment>
			</Container>
		);
	}
}

export default withRouter(Overview);
